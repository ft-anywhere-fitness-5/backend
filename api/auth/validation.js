const Joi = require('joi')

const userSchema = Joi.object({
    username: Joi.string().trim().min(3).required(),
    password: Joi.string().trim().min(5).required(),
    role: Joi.string().default('client')
})

module.exports = userSchema
