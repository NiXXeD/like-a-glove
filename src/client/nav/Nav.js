require('./nav.scss')

module.exports = {
    template: require('./nav.html'),
    controller: class Nav {
        /* @ngInject */
        constructor($mdSidenav) {
            this.$mdSidenav = $mdSidenav
        }
    }
}
