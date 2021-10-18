const Joi = require('joi')

const classesSchema = Joi.object({
    class_name: Joi.string(),
    class_typ: Joi.string(),
    class_start_time: Joi.string(),
    class_duration: Joi.number(),
    class_intensity: Joi.string(),
    class_location: Joi.string(),
    class_registered_attendees: Joi.number(),
    class_max_size: Joi.number(),
})

module.exports = classesSchema
