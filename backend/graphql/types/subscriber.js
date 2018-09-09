const {
  GraphQLString,
  GraphQLObjectType
} = require('graphql')

const SubscriberType = new GraphQLObjectType({
  name: 'Subscriber',
  fields: {
    id: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    token: {
      type: GraphQLString
    }
  }
})

module.exports = SubscriberType
