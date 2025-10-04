import Joi from "joi"

const createMapelValidation = Joi.object({
    nama : Joi.string().max(100).required()
})

const getMapelValidation = Joi.number().positive().required();

const updateMapelValidation = Joi.object({
    nama : Joi.string().max(100).optional(),
    id : Joi.number().positive().required(),
    guru_id : Joi.number().positive().optional()
    //disini nanti ada buat absen tapi karena gw belom buat nanti tolong di buat ya
})

const searchMapelValidation = Joi.object({
     page : Joi.number().min(1).positive().default(1),
    size : Joi.number().min(1).max(100).default(10),
    nama : Joi.string().optional(),
    guru : Joi.string().optional()
})

export {
    createMapelValidation,getMapelValidation,updateMapelValidation,searchMapelValidation
}