const objectAssign = require('object-assign');
const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./base.config');

const config = objectAssign(baseConfig, {
    devtool: 'source-map',
    entry: [
        './src/index.js'
    ],
    output: {
        filename: '[name]-[hash].js',
        path: path.join(__dirname, '..', 'dist'),
        publicPath: '/'
    },
    postcss: () => ([autoprefixer])
});

config.plugins = config.plugins.concat([
    new ExtractTextPlugin('styles.css', 'style.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new CopyWebpackPlugin([
        { from: 'assets' },
        { from: './package.json' }
    ]),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
        __DEV__: false,
        'process.env.BASE_URL': JSON.stringify('https://api.staging.dih.capra.me'),
        'process.env.VERSION': JSON.stringify(require('../package.json').version),
        'process.env.RAVEN_DSN': JSON.stringify('https://d5a9b88a5e204ea99cc58f8a187c817c@sentry.dih.capra.me/3'),
        'process.env.NODE_ENV': JSON.stringify('production')
    })
]);

config.module.loaders = [
    {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', '!css-loader!sass-loader')
    },
    {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', '!css-loader')
    },
    {
        test: /\.json$/,
        loader: 'json-loader'
    },
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
    }
];

module.exports = config;
