import Joi from "joi"

const createMapelValidation = Joi.object({
    nama : Joi.string().max(100).required()
})

export {
    createMapelValidation
}