const _ = require('lodash')
const Hapi = require('hapi')

// create server object(s)
const server = new Hapi.Server({
    connections: {
        routes: {cors: true}
    }
})
server.connection({port: process.env.PORT || 1701})

// load all routes
let routes = require('require-directory')(module, './routes')
_.forIn(routes, route => {
    if (_.isArray(route)) {
        route.forEach(sub => server.route(sub))
    } else {
        server.route(route)
    }
})

// start up the server
server.register({
        register: require('good'),
        options: {
            reporters: {
                console: [
                    {
                        module: 'good-squeeze',
                        name: 'Squeeze',
                        args: [{response: '*', log: '*'}]
                    },
                    {module: 'good-console'},
                    'stdout'
                ]
            }
        }
    }, error => {
        // something bad happened loading the plugin
        if (error) throw error
        server.start(serverError => {
            if (serverError) throw serverError
            server.log('info', `Server running at: ${server.info.uri}`)
        })
    }
)
