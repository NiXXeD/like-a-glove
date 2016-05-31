require('./search.scss')

module.exports = {
    template: require('./search.html'),
    controller: class Search {
        /* @ngInject */
        constructor($q, dataService) {
            this.$q = $q
            this.dataService = dataService
        }

        performQuery(searchText) {
            return this.dataService.listGames(searchText)
        }

        selectedItemChange(item) {
            if (item) {
                console.log('You picked', item)
            }
            this.searchText = null
        }
    }
}
