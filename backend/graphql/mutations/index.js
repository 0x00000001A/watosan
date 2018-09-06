const post = require('./post');
const file = require('./file');

const mutations = {
  ...post,
  ...file
};

module.exports = mutations;
