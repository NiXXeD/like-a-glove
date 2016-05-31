const Joi = require('joi')
const uuid = require('uuid')
const schema = require('../server/schemas/games')
const db = require('../server/db').get('games')

require('./parsed.json')
    .forEach(game => {
        Joi.validate(game, schema, err => {
            if (!err) {
                //check if game exists already
                let existing = db.find({name: game.name})
                if (!existing) {
                    game.id = uuid.v4()
                    db.push(game).value()
                }
            } else {
                console.log(`${game.name} : ${err}`)
            }
        })
    })
