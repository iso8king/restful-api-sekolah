import { validate } from "../validation/validate.js";
import { prismaClient } from "../application/database.js";
import { responseError } from "../error/response-error.js";
import { createKelasValidation, getKelasValidation, removeKelasValidation } from "../validation/kelas-validation.js";

const create = async(request) =>{
    request = validate(createKelasValidation , request);

    return prismaClient.kelas.create({
        data : request
    })
}

const remove = async(request)=> {
    request = validate(removeKelasValidation , request);

    const kelasInDatabase = await prismaClient.kelas.count({
        where : {
            nama_kelas : request.nama_kelas
        }
    })

    if(!kelasInDatabase){
        throw new responseError(404 , "Kelas Tidak Ada!")
    }

    await prismaClient.kelas.delete({
        where : {
            nama_kelas : request.nama_kelas
        }
    })
}

const get = async(request)=>{
    request = validate(getKelasValidation , request);

     const kelasInDatabase = await prismaClient.kelas.count({
        where : {
            nama_kelas : request
        }
    })

    if(!kelasInDatabase){
        throw new responseError(404 , "Kelas Tidak Ada!")
    }

    return prismaClient.kelas.findUnique({
        where : {
            nama_kelas : request
        }
    })
}

export default {
    create,remove,get
}