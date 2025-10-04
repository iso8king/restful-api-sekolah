import Joi from "joi";

export const createAbsensiValidation = Joi.object({
    mapel_id : Joi.number().positive().required(),
    tanggal : Joi.date().iso().required(),
    data : Joi.array().min(1).required().items(
        Joi.object({
           siswa_id : Joi.number().positive().required(),
           status :  Joi.string().valid('hadir', 'sakit', 'izin', 'alfa').required() 
        })
    )
});