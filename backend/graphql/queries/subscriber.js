const { ForbiddenError } = require('apollo-server-express')
const { GraphQLList } = require('graphql')

const Subscriber = require('../../models/subscriber')
const SubscriberType = require('../types/subscriber')

const queries = {
  subscribers: {
    type: GraphQLList(SubscriberType),
    description: 'Get all subscribers',
    resolve (parent, args, { user }) {
      if (!user) {
        throw new ForbiddenError('Unauthorized')
      }

      return Subscriber.find().sort({ _id: -1 }).exec()
    }
  }
}

module.exports = queries
