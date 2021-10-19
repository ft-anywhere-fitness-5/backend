const Joi = require('joi')

const userSchema = Joi.object({
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
    role: Joi.string().default('client')
})

module.exports = userSchema
