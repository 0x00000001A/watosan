const post = require('./post');
const file = require('./file');

const queries = {
  ...post,
  ...file
};

module.exports = queries;
