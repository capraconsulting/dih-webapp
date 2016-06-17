const child = require('child_process');
child.spawn('npm', ['run', 'selenium', 'start'], {
    detached: true
});
child.spawn('npm', ['run', 'dev'], {
    detached: true
});

let test;
setTimeout(() => {
    test = child.spawn('wdio', ['test/wdio.conf.js'], {});
    test.stdout.on('data', (data) => {
        console.log(`${data}`);
    });

    test.stderr.on('data', (data) => {
        console.log(`${data}`);
    });

    test.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}, 5000);
