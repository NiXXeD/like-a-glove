const fs = require('fs')
const rex = /number\sof\scards:\s?(\d+)\s?@?\s?(\d+)?\s?.\s?(\d+)?/gi

let parsed = require('./scraped.json')
    .map(scraped => {
        let game = {
            name: scraped.name,
            cards: []
        }

        //TODO support expansions
        let text = scraped.text.split(/expansion/i)[0]

        let matches
        while ((matches = rex.exec(text)) !== null) {
            let card = {
                count: +matches[1]
            }
            let d1 = matches[2]
            let d2 = matches[3]
            if (d1 && d2) {
                card.width = +Math.min(d1, d2)
                card.height = +Math.max(d1, d2)
            } else {
                //determine size via Fantasy Flight size
                let ff = text.match(/Fantasy Flight.+?([0-9.]+)\s.\s([0-9.]+)mm/)
                if (ff) {
                    card.width = +ff[1]
                    card.height = +ff[2]
                    card.assumed = true
                }
            }
            game.cards.push(card)
        }
        return game
    })
    .map(game => {
        game.cards = game.cards.filter(card => card.width && card.height)
        return game
    })
    .filter(game => game.cards.length)

fs.writeFileSync('./parsed.json', JSON.stringify(parsed, null, 2))
