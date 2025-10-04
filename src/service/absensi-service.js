import { validate } from "../validation/validate.js";
import { prismaClient } from "../application/database.js";
import { createAbsensiValidation } from "../validation/absensi-validation.js";
import { responseError } from "../error/response-error.js";

const create = async(request)=>{
    const createRequest = validate(createAbsensiValidation , request);

    const mapel = await prismaClient.mapel.count({
        where : {
            id : createRequest.mapel_id
        }
    })

    if(!mapel){
        throw new responseError(404 , "Mapel Tidak Ditemukan");
    }

    const siswaIds = createRequest.data.map(item =>  item.siswa_id);
    
    const existingSiswa = await prismaClient.siswa.findMany({
        where : {
            id : {in : siswaIds}
        },select : {
            id : true
        }
    });

    const validIds = existingSiswa.map(s => s.id);
    const invalidIds = siswaIds.filter(siswa => !validIds.includes(siswa));
    
    if(invalidIds.length > 0){
        throw new responseError(404 , `Siswa tidak ditemukan di id : ${invalidIds.join(', ')}`);
    }

    return prismaClient.absensi.createMany({
        data : createRequest.data.map(item => ({
            mapel_id : createRequest.mapel_id,
            siswa_id : item.siswa_id,
            status : item.status,
            tanggal : createRequest.tanggal
        })),
        skipDuplicates : true    
    })
}

export default{
    create
}