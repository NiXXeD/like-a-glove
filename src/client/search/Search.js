require('./search.scss')

module.exports = {
    template: require('./search.html'),
    controller: class Search {
        /* @ngInject */
        constructor($location, dataService) {
            this.$location = $location
            this.dataService = dataService
        }

        performQuery(searchText) {
            return this.dataService.listGames(searchText)
        }

        selectedItemChange(item) {
            if (item) {
                this.$location.url(`games/${item.id}`)
            }
            this.searchText = null
        }
    }
}
