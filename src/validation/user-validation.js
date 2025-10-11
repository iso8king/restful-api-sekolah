import Joi from "joi";

const registerUserValidation = Joi.object({
    email : Joi.string().max(100).required(),
    password : Joi.string().max(100).required(),
    nama : Joi.string().max(100).required(),
    role : Joi.string().valid('admin' , 'siswa' , 'guru').required(),
    kelas : Joi.string().max(100).optional()
})

const loginUserValidation = Joi.object({
    email : Joi.string().max(100).required(),
    password : Joi.string().max(100).required(),

})

const getUserValidation = Joi.string().max(100).required();

const updateUserValidation = Joi.object({
    email : Joi.string().max(100).required(),
    password : Joi.string().max(100).optional(),
    nama : Joi.string().max(100).optional(),
    emailChange : Joi.string().max(100).optional()
})

export{
    registerUserValidation,loginUserValidation,getUserValidation,updateUserValidation
}