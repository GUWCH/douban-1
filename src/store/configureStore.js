if (process.env.NODE_ENV) {
    module.exports = require('./configureStore.pro')
} else {
    module.exports = require('./configureStore.dev')
}