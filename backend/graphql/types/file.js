const { GraphQLString, GraphQLObjectType } = require('graphql')

const FileType = new GraphQLObjectType({
  name: 'File',
  fields: {
    id: { type: GraphQLString },
    filename: { type: GraphQLString, required: true },
    mimetype: { type: GraphQLString, required: true },
    encoding: { type: GraphQLString, required: true }
  }
})

module.exports = FileType
