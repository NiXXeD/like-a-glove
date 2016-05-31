const db = require('../db')

module.exports = {
    method: 'GET',
    path: '/test',
    handler: (request, reply) => {
        let result = db.games.map(game => {
            return game.cards.map(card => {
                return {
                    card,
                    sleeveOptions: db.sleeves.filter(sleeve => {
                        return [
                            card.width <= sleeve.width,
                            card.height <= sleeve.height,
                            sleeve.width - card.width <= 2,
                            sleeve.height - card.height <= 2
                        ].every(a => a)
                    })
                }
            })
        })
        reply(result)
    }
}
