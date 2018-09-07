const { GraphQLObjectType } = require('graphql')

const mutations = require('./mutations')

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...mutations
  }
})

module.exports = MutationType
