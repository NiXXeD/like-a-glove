const angular = require('angular')
require('angular-route')
require('angular-material')
require('angular-material/angular-material.css')

angular.module('application', [
    'ngRoute',
    'ngMaterial'
])

    //config
    .config(require('./config/themeConfig'))
    .config(require('./config/routeConfig'))

    //components
    .component('app', require('./app/App'))
    .component('gameDetail', require('./gameDetail/GameDetail'))
    .component('gameList', require('./gameList/GameList'))
    .component('home', require('./home/Home'))
    .component('nav', require('./nav/Nav'))
    .component('search', require('./search/Search'))

    //services
    .service('dataService', require('./services/DataService'))
