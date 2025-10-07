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

export const getAbsensiValidation = Joi.object({
    siswa_id : Joi.number().positive().optional(),
    mapel_id : Joi.number().positive().required(),
    tanggal : Joi.date().iso().required()
});

export const updateAbsensiValidation = Joi.object({
    status : Joi.string().valid("hadir","alfa","izin","sakit").required(),
    siswa_id: Joi.array().items(Joi.number().integer()).required(),
     mapel_id : Joi.number().positive().required(),
    tanggal : Joi.date().iso().required()
});

export const deleteAbsensiValidation = Joi.object({
    siswa_id: Joi.array().items(Joi.number().integer()).required(),
     mapel_id : Joi.number().positive().required(),
    tanggal : Joi.date().iso().required()
});