const low = require('lowdb')
const db = low('../../db.json', {storage: require('lowdb/lib/file-async')})
db.defaults({
    games: [],
    sleeves: []
})

module.exports = db
