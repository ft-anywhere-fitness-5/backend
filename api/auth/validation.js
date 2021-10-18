const Joi = require('joi')

const userSchema = Joi.object({
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required()
})

module.exports = userSchema
