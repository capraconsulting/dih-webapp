import webpack from 'webpack';
import path from 'path';
import express from 'express';
import config from './dev.config';
import proxy from 'http-proxy-middleware';

const app = express();

app.set('host', '0.0.0.0');
app.set('port', 3000);

const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use('/api', proxy({
    target: 'http://localhost:9000',
    pathRewrite: {
        '^/api': '/'
    }
}));

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('*', (req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
        if (err) next(err);
        res.set('content-type', 'text/html');
        res.send(result).end();
    });
});

app.listen(app.get('port'), app.get('host'), (err) => {
    if (err) console.error(err); // eslint-disable-line
    console.log('Development server listening on %s:%s', app.get('host'), app.get('port')); // eslint-disable-line
});
