import Joi from 'joi'

export const createKelasValidation = Joi.object({
    nama_kelas : Joi.string().max(100).required()
});

export const removeKelasValidation = Joi.object({
    nama_kelas : Joi.string().max(100).required()
});

export const getKelasValidation = Joi.string().max(100).required();
