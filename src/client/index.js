const angular = require('angular')
require('angular-material')
require('angular-material/angular-material.css')

angular.module('application', [
    'ngMaterial'
])

    //config
    .config(require('./config/themeConfig'))

    //components
    .component('app', require('./app/App'))
    .component('nav', require('./nav/Nav'))
    .component('search', require('./search/Search'))

    //services
    .service('dataService', require('./services/DataService'))
