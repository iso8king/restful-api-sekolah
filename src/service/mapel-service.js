import { validate } from "../validation/validate.js";
import { prismaClient } from "../application/database.js";
import { createMapelValidation } from "../validation/mapel-validation.js";


const create = async(guruId,request) => {
    const createRequest = validate(createMapelValidation , request);
    createRequest.guru_id = guruId;
    console.log(createRequest)

    return prismaClient.mapel.create({
        data : createRequest,
        select : {
            nama : true,
            guru : true
        }
    })

}

export default{
    create
}