const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = function () {
    const appName = process.env.APP

    const isProduction = process.env.NODE_ENV === 'production'
    const appPath = `${__dirname}/apps/${appName}/client`

    return {
        mode: isProduction ? 'production' : 'development',
        entry: [
            '@babel/polyfill', //includes regenerator runtime and core-js
            `${appPath}/index.js`,
        ],
        output: {
            path: `${__dirname}/public/${appName}`,
            filename: 'bundle.js',
        },
        optimization: {
            minimize: isProduction,
        },
        devtool: isProduction ? false : 'inline-source-map',
        resolve: {
            extensions: ['.js', '.jsx', '.json'],
        },
        plugins: [new CopyWebpackPlugin({patterns: [{from: `${appPath}/images`}]})],
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    include: appPath,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                    },
                },
                {
                    test: /\.(css)$/,
                    include: appPath,
                    use: [{loader: 'style-loader'}, {loader: 'css-loader'}],
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {},
                        },
                    ],
                },
            ],
        },
    }
}
