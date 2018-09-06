const { GraphQLList } = require('graphql');

const File = require('../../models/file');
const FileType = require('../types/file');

const queries = {
  files: {
    type: GraphQLList(FileType),
    description: 'Get all files',
    async resolve() {
      return File.find().exec()
    }
  }
};

module.exports = queries;
