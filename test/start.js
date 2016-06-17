const child = require('child_process');
child.spawn('npm', ['run', 'selenium', 'start'], {
    detached: true
});
child.spawn('npm', ['run', 'dev'], {
    detached: true
});

setTimeout(() => {
    child.exec('wdio test/wdio.conf.js', (err, stdout, stderr) => {
        console.log(err); // eslint-disable-line
        console.log(stdout); // eslint-disable-line
        console.log(stderr); // eslint-disable-line
    });
}, 5000);
