if (__DEV__) { // eslint-disable-line
    module.exports = require('./Root.dev');
} else {
    module.exports = require('./Root.prod');
}
