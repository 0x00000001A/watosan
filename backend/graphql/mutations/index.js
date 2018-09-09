const post = require('./post')
const file = require('./file')
const auth = require('./auth')
const subscriber = require('./subscriber')

const mutations = {
  ...post,
  ...file,
  ...auth,
  ...subscriber
}

module.exports = mutations
