if (__DEV__) { // eslint-disable-line
    module.exports = require('./store.dev');
} else {
    module.exports = require('./store.prod');
}
