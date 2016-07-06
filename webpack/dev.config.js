const objectAssign = require('object-assign');
const webpack = require('webpack');
const baseConfig = require('./base.config');

const config = objectAssign(baseConfig, {
    devtool: 'source-map',
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        './src/index.js'
    ]
});

config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
        __DEV__: true,
        'process.env.BASE_URL': JSON.stringify('/api')
    })
]);

module.exports = config;
