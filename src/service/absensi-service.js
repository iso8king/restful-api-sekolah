import { validate } from "../validation/validate.js";
import { prismaClient } from "../application/database.js";
import { createAbsensiValidation, deleteAbsensiValidation, getAbsensiValidation, updateAbsensiValidation } from "../validation/absensi-validation.js";
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

const get = async(request, mapelId) => {
    request.mapel_id = mapelId;
    request = validate(getAbsensiValidation , request);

    //cek mapel
     const mapel = await prismaClient.mapel.count({
        where : {
            id : request.mapel_id
        }
    })

    if(!mapel){
        throw new responseError(404 , "Mapel Tidak Ditemukan");
    } 

    //cek siswa
    if(request.siswa_id){
        const siswaIds = [request.siswa_id];
    
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
    }

    const filters = [
        {mapel_id : request.mapel_id},
        {tanggal : request.tanggal}
    ];
    if(request.siswa_id){
        filters.push({
            siswa_id : request.siswa_id
        });
    }

    return prismaClient.absensi.findMany({
        where : {
            AND : filters
        },select : {
            siswa : {
                select : {
                    nama : true
                }
            },
            mapel : {
                select :{
                    nama : true
                }
            },

            tanggal : true,
            status : true
        }
    })
   
}

const update = async(request,mapelId)=>{
    request.mapel_id = mapelId;
    request = validate(updateAbsensiValidation,request);

    //cek mapel
     const mapel = await prismaClient.mapel.count({
        where : {
            id : request.mapel_id
        }
    })

    if(!mapel){
        throw new responseError(404 , "Mapel Tidak Ditemukan");
    } 

    //cek siswa
   
        const siswaIds = request.siswa_id;
    
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
    

    return prismaClient.absensi.updateMany({
        where : {
            siswa_id : {
                in : siswaIds
            },
            tanggal : request.tanggal,
            mapel_id : request.mapel_id
        },data : {
            status : request.status
        }
    })
}

const remove = async(request,mapelId)=>{
    request.mapel_id = mapelId;
    request = validate(deleteAbsensiValidation,request);

    //cek mapel
     const mapel = await prismaClient.mapel.count({
        where : {
            id : request.mapel_id
        }
    })

    if(!mapel){
        throw new responseError(404 , "Mapel Tidak Ditemukan");
    } 

    //cek siswa
   
        const siswaIds = request.siswa_id;
    
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
    

    await prismaClient.absensi.deleteMany({
        where : {
            siswa_id : {
                in : siswaIds
            },
            tanggal : request.tanggal,
            mapel_id : request.mapel_id
        }
    })
}

export default{
    create,get,update,remove
}