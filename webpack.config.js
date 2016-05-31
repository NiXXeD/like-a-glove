const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/client/index.js',
    output: {
        path: `${__dirname}/dist`,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /(node_modules)/, loaders: ['ng-annotate', 'babel-loader']},
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.scss$/, loader: 'style-loader!css-loader!postcss-loader'},
            {test: /\.html$/, loader: 'raw-loader'},
            {test: /\.png/, loader: 'file?name=img/[name].[ext]'}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/client/index.html'
        })
    ],
    postcss: () => ([require('precss')])
}
