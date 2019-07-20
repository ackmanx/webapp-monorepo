const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const appPath = `${__dirname}/apps/dictionary/client` //todo: setup required

module.exports = function () {
    const isProduction = process.env.NODE_ENV === 'production'

    return {
        mode: isProduction ? 'production' : 'development',
        entry: [
            '@babel/polyfill', //includes regenerator runtime and core-js
            `${appPath}/index.js`,
        ],
        output: {
            path: `${__dirname}/public/dict`, //todo: setup required
            filename: 'dict-bundle.js' //todo: setup required
        },
        optimization: {
            minimize: isProduction,
        },
        devtool: isProduction ? false : 'inline-source-map',
        resolve: {
            extensions: ['.js', '.jsx', '.json']
        },
        plugins: [
            new CopyWebpackPlugin([
                {from: 'icon.png'},
                {from: `${appPath}/images`},
            ]),
        ],
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    include: appPath,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                },
                {
                    test: /\.(css)$/,
                    include: appPath,
                    use: [
                        {loader: 'style-loader'},
                        {loader: 'css-loader'},
                    ]
                },
            ]
        },
    }
}
