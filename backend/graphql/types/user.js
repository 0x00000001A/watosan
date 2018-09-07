const {
  GraphQLString,
  GraphQLObjectType
} = require('graphql')

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    }
  }
})

module.exports = UserType
