module.exports = /* @ngInject */
    function($routeProvider) {
        $routeProvider
            .when('/home', {
                template: '<home></home>'
            })
            .when('/games', {
                template: '<game-list></game-list>'
            })
            .when('/games/:id', {
                template: '<game-detail></game-detail>'
            })
            .otherwise('/home')
    }
