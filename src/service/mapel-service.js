import { validate } from "../validation/validate.js";
import { prismaClient } from "../application/database.js";
import { createMapelValidation, getMapelValidation, searchMapelValidation, updateMapelValidation } from "../validation/mapel-validation.js";
import { responseError } from "../error/response-error.js";


const create = async(guruId,request) => {
    const createRequest = validate(createMapelValidation , request);
    createRequest.guru_id = guruId;
    console.log(createRequest)

    return prismaClient.mapel.create({
        data : createRequest,
        select : {
            id : true,
            nama : true,
            guru : true
        }
    })

}

const get = async(mapelId)=>{
    mapelId = validate(getMapelValidation , mapelId);

    const mapel = await prismaClient.mapel.findUnique({
        where : {
            id : mapelId
        },include : {
            guru : true
        }
    });


    if(!mapel){
        throw new responseError(404 , "Mapel Not Found");
    }
    return mapel;
}

const update = async(mapelId , request) =>{
     request.id = mapelId;
    const updateRequest = validate(updateMapelValidation , request);
    const data = {}

    const mapel = await prismaClient.mapel.count({
        where : {
            id : updateRequest.id
        }
    });

    if(mapel !== 1){
        throw new responseError(404 , "Mapel Not Found");
    }

    if(updateRequest.guru_id){
        data.guru_id = updateRequest.guru_id;
    }

    if(updateRequest.nama){
        data.nama = updateRequest.nama;
    }

    return prismaClient.mapel.update({
        where :{
            id : updateRequest.id
        },data : data
    })
}

const remove = async(mapelId)=>{
    mapelId = validate(getMapelValidation,mapelId);

    const mapel = await prismaClient.mapel.count({
        where : {
            id : mapelId
        }
    });

    if(mapel !== 1){
        throw new responseError(404 , "Mapel Not Found");
    }

    await prismaClient.mapel.delete({
        where : {
            id : mapelId
        }
    })
}

const search = async(request)=>{
    request = validate(searchMapelValidation , request);

    const filters = [];
    const skip = (request.page - 1)* request.size;

    if(request.nama){
        filters.push({
            nama : {
                contains : request.nama
            }
        });
    }

    if(request.guru){
        filters.push({
    guru: {
      user: {
        nama: {
          contains: request.guru
        }
      }
    }
        });
    }

    const mapel = await prismaClient.mapel.findMany({
        where : {
            AND : filters
        },
        skip : skip,
        take : request.size,
        include : {
            guru : {
                include : {
                    user : {
                        select : {
                            nama : true
                        }
                    }
                }
            }
        }

    });

    const totalItems = await prismaClient.mapel.count({
         where : {
            AND : filters
        }
    });

    return {
        data : mapel,
        paging : {
            page : request.page,
            total_item : totalItems,
            total_page :  Math.ceil(totalItems/ request.size)
        }
    }
}

export default{
    create,get,update,remove,search
}