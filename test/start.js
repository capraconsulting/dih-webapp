const child = require('child_process');
child.spawn('npm', ['run', 'selenium', 'start'], {
    detached: true
});
