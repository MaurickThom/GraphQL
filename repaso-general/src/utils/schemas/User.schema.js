const Joi = require('@hapi/joi')
const regex_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!?/@.-_=])[0-9a-zA-Z!?/@.-_=]{8,}$/
const regex_email = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

const CreateUserSchema = Joi.object({
    email:Joi.string()
        .pattern(regex_email)
        // .email({minDomainSegments:2,tlds:{
        //     allow:['com','net']
        // }})
        .required(),
    username:Joi.string()
        .min(3)
        .max(10)
        .required(),
    password:Joi.string()
        .required(),
    firstname:Joi.string()
        .min(4)
        .max(10)
        .required(),
    lastname : Joi.string()
        .min(4)
        .max(10)
        .required()
})


const UpdateUserSchema = Joi.object({
    email:Joi.string()
        .pattern(regex_email),
    username:Joi.string()
        .min(3)
        .max(10),
    password:Joi.string(),
    firstname:Joi.string()
        .min(4)
        .max(10),
    lastname : Joi.string()
        .min(4)
        .max(10)
})

module.exports = {
    CreateUserSchema,
    UpdateUserSchema
}