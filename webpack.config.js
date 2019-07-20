const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const appPath = path.join(__dirname, 'apps', 'dictionary', 'client')

module.exports = function () {
    const isProduction = process.env.NODE_ENV === 'production'

    return {
        mode: isProduction ? 'production' : 'development',
        entry: [
            '@babel/polyfill', //includes regenerator runtime and core-js
            path.join(appPath, 'index.js'),
        ],
        output: {
            path: path.join(__dirname, 'public', 'dict'),
            filename: 'dict-bundle.js'
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
                {from: path.join(appPath, 'images'),},
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
