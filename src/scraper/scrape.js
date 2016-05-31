const osmosis = require('osmosis')
const fs = require('fs')

let results = []
osmosis
    .get('https://boardgamegeek.com/geeklist/164572/card-sleeve-sizes-games/page/1?')
    .paginate('div.pager a[title="next page"]', 99)
    .find('div.mb5 div.article')
    .set({
        name: 'div.geeklist_item_title div.fl > a[2]',
        text: 'dd.doubleright'
    })
    .data(data => results.push(data))
    .done(() => fs.writeFileSync('./scraped.json', JSON.stringify(results)))
    .log(console.log)
    .error(console.log)
