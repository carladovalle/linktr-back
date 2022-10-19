import joi from "joi"

const registerSchema = joi.object({
    name:joi.string().required(),
    username:joi.string().required(),
    email:joi.string().required(),
    password:joi.string().required(),
    image:joi.string().regex(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/).required()
})

const loginSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required()
})

export { registerSchema, loginSchema }