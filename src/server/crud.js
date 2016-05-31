const Joi = require('joi')
const uuid = require('uuid')

module.exports = function(type) {
    const db = require('./db').get(type)
    const schemaPath = `./schemas/${type}`
    const schema = require(schemaPath)
    
    return [
        {
            method: 'POST',
            path: `/${type}`,
            handler: (request, reply) => {
                let newThing = request.payload
                return Joi.validate(newThing, schema, err => {
                    if (!err) {
                        newThing.id = uuid.v4()
                        db.push(newThing).value()
                        reply(newThing)
                    } else {
                        reply(err.details)
                    }
                })
            }
        }, {
            method: 'GET',
            path: `/${type}`,
            handler: (request, reply) => {
                reply(db.value())
            }
        }, {
            method: 'GET',
            path: `/${type}/{id}`,
            handler: (request, reply) => {
                let thing = db.find({id: request.params.id})
                reply(thing)
            }
        }, {
            method: 'PUT',
            path: `/${type}/{id}`,
            handler: (request, reply) => {
                let thing = request.payload
                return Joi.validate(thing, schema, err => {
                    if (!err) {
                        thing.id = request.params.id
                        db.remove({id: request.params.id}).value()
                        db.push(thing).value()
                        reply(thing)
                    } else {
                        reply(err.details)
                    }
                })
            }
        }, {
            method: 'DELETE',
            path: `/${type}/{id}`,
            handler: (request, reply) => {
                let id = request.params.id
                if (id) db.remove({id}).value()
                reply({id})
            }
        }
    ]
}
