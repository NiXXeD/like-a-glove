const _ = require('lodash')
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
                let query = new RegExp(_.escapeRegExp(request.query.q), 'i')
                let page = request.params.page || 0
                let pageSize = request.params.pageSize || 10
                let result = db
                    .filter(i => contains(i, query))
                    .slice(page * pageSize, pageSize)
                    .value()
                reply(result)
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

function contains(object, regex) {
    if (_.isString(object)) {
        return object.match(regex)
    } else if (_.isArray(object)) {
        return _.some(object, it => contains(it, regex))
    } else if (_.isObject(object)) {
        let keys = _.keys(object)
        return _.some(keys, key => contains(object[key], regex))
    }
}
