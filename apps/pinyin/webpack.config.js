module.exports = function () {
    const appName = process.env.APP

    const isProduction = process.env.NODE_ENV === 'production'

    return {
        mode: isProduction ? 'production' : 'development',
        entry: [
            '@babel/polyfill', //includes regenerator runtime and core-js
            `${__dirname}/client/index.js`,
        ],
        output: {
            path: `${__dirname}/../../public/${appName}`,
            filename: 'bundle.js',
        },
        optimization: {
            minimize: isProduction,
        },
        devtool: isProduction ? false : 'inline-source-map',
        resolve: {
            extensions: ['.js', '.jsx', '.json'],
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    include: `${__dirname}/client`,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                    },
                },
                {
                    test: /\.(css)$/,
                    include: `${__dirname}/client`,
                    use: [{loader: 'style-loader'}, {loader: 'css-loader'}],
                },
            ],
        },
    }
}
