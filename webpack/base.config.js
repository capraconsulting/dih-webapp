const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.join(__dirname, '../'),
    output: {
        path: path.join(__dirname, '..', 'dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/, // Matches both .js and .jsx
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new HtmlWebpackPlugin({
            template: 'assets/index.ejs'
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.scss']
    }
};
