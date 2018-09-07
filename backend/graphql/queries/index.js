const post = require('./post')
const file = require('./file')
const auth = require('./auth')

const queries = {
  ...post,
  ...file,
  ...auth
}

module.exports = queries
