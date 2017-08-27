if (__PRODUCTION) {
    module.exports = require('./configureStore.prod')
} else {
    module.exports = require('./configureStore.dev')
}