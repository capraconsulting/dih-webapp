const objectAssign = require('object-assign');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./base.config');

const config = objectAssign(baseConfig, {
    devtool: 'source-map',
    entry: [
        './src/app.jsx'
    ],
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
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
        __DEV__: false,
        'process.env.BASE_URL': JSON.stringify('http://dev-api.dih.capra.me'),
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
        test: /\.jsx?$/, // Matches both .js and .jsx
        exclude: /node_modules/,
        loader: 'babel',
        query: {
            cacheDirectory: true,
            presets: ['react', 'es2015']
        }
    },
    {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
    },
    {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
    },
    {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
    },
    {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: 'file?name=[path][name].[ext]&context=/the/root/path'
    },
    {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
    },
    {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
    }
];

module.exports = config;
