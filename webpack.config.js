const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.(less|css)$/,
                use: [
                        loader: require.resolve('style-loader'),
                        options: {insertAt: 'top'}
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            sourceMap: true,
                            importLoaders: 1
                        }
                    },
                    {
                        loader: require.resolve('less-loader'),
                        options: {sourceMap: true}
                    }
                ].filter(loader => loader)
            },
            {
                test: /\.(jpe?g$|gif|png|svg)$/i,
                use: [
                    {
                        loader: require.resolve('file-loader'),
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    },
                ].filter(loader => loader)
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                use: {
                    loader: require.resolve('file-loader'),
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html"
        })
    ]
};
