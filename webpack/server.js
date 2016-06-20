import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import path from 'path';
import express from 'express';
import config from './dev.config';

const app = express();

app.set('host', '0.0.0.0');
app.set('port', 3000);

const compiler = webpack(config);

app.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(hotMiddleware(compiler));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(app.get('port'), app.get('host'), (err) => {
    if (err) console.error(err); // eslint-disable-line
    console.log('Development server listening on %s:%s', app.get('host'), app.get('port')); // eslint-disable-line
});
