const post = require('./post')
const file = require('./file')
const auth = require('./auth')
const subscriber = require('./subscriber')

const queries = {
  ...post,
  ...file,
  ...auth,
  ...subscriber
}

module.exports = queries
