import Joi from "joi";

const registerUserValidation = Joi.object({
    email : Joi.string().max(100).required(),
    password : Joi.string().max(100).required(),
    nama : Joi.string().max(100).required(),
    role : Joi.string().valid('admin' , 'siswa' , 'guru').required()
})

const loginUserValidation = Joi.object({
    email : Joi.string().max(100).required(),
    password : Joi.string().max(100).required(),

})

export{
    registerUserValidation,loginUserValidation
}