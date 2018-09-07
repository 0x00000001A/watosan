const { GraphQLObjectType } = require('graphql')

const queries = require('./queries')

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...queries
  }
})

module.exports = QueryType
