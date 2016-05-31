module.exports = class DataService {
    /* @ngInject */
    constructor($http) {
        this.$http = $http
    }
    
    listGames(q) {
        let suffix = q ? `?q=${q}` : ''
        return this.$http.get(`http://localhost:1701/games${suffix}`)
            .then(result => result.data)
    }
}
