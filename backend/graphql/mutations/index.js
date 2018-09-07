const post = require('./post')
const file = require('./file')
const auth = require('./auth')

const mutations = {
  ...post,
  ...file,
  ...auth
}

module.exports = mutations
