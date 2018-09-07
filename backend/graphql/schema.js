const { GraphQLSchema } = require('graphql')
const { GraphQLUpload } = require('apollo-upload-server')

const query = require('./query')
const mutation = require('./mutation')

module.exports = new GraphQLSchema({
  types: [
    GraphQLUpload
  ],
  query,
  mutation
})
