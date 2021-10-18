const Joi = require('joi')

const classesSchema = Joi.object({
    class_name: Joi.string().trim().required(),
    class_typ: Joi.string().trim().required(),
    class_start_time: Joi.string().trim().required(),
    class_duration: Joi.number().positive().precision(0).required(),
    class_intensity: Joi.string().trim().required(),
    class_location: Joi.string().trim().required(),
    class_registered_attendees: Joi.number().positive().required(),
    class_max_size: Joi.number().positive().precision(0).required(),
})

module.exports = classesSchema
