const objectAssign = require('object-assign');
const webpack = require('webpack');
const baseConfig = require('./base.config');

module.exports = objectAssign(baseConfig, {
    devtool: 'source-map',
    entry: [
        'webpack-hot-middleware/client',
        './src/app.jsx'
    ],
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            __DEV__: true
        })
    ]
});
