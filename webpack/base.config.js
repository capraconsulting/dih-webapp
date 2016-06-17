const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
    output: {
        path: path.join(__dirname, '..', 'public'),
        filename: 'bundle.js',
        publicPath: ''
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
                test: /\.scss$/,
                loaders: ['style', 'css', 'postcss', 'sass']
            },
            {
                test: /\.css$/,
                loader: ['style', 'css', 'postcss']
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss']
    },
    postcss: () => ([autoprefixer])
};
