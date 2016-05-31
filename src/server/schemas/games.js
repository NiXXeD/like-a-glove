const Joi = require('joi')

module.exports = Joi.object().keys({
    name: Joi.string().min(1).max(60).required(),
    cards: Joi.array().items(Joi.object().keys({
        description: Joi.string().min(1).max(60),
        count: Joi.number().integer().min(1).max(2000).required(),
        width: Joi.number().positive().precision(1).min(1).max(200).required(),
        height: Joi.number().positive().precision(1).min(1).max(200).required()
    })).required()
})
