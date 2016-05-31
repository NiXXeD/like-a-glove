module.exports = {
    template: require('./gameDetail.html'),
    controller: class GameDetail {
        /* @ngInject */
        constructor($routeParams, dataService) {
            this.$routeParams = $routeParams
            this.dataService = dataService
        }
        
        $onInit() {
            return this.dataService.getGame(this.$routeParams.id)
                .then(game => this.game = game)
        }
    }
}
