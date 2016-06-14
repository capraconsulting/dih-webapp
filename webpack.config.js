module.exports = {
    entry: './src/app.jsx',
    output: {
        filename: 'build/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/, // Matches both .js and .jsx
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
