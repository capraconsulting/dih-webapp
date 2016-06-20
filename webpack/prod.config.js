const objectAssign = require('object-assign');
const webpack = require('webpack');
const baseConfig = require('./base.config');

module.exports = objectAssign(baseConfig, {
    entry: [
        './src/app.jsx'
    ],
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.DefinePlugin({
            __DEV__: false,
            'process.env.BASE_URL': JSON.stringify('/api')
        })
    ]
});
