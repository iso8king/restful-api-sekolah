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

export {
    createMapelValidation,getMapelValidation,updateMapelValidation
}