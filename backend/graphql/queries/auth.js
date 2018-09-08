const { ForbiddenError } = require('apollo-server-express')

const User = require('../../models/user')
const UserType = require('../types/user')

const queries = {
  authMe: {
    type: UserType,
    async resolve (parent, args, { user }) {
      if (!user) {
        throw new ForbiddenError('You are not authenticated!')
      }

      return User.findById(user.id).exec()
    }
  }
}

module.exports = queries
