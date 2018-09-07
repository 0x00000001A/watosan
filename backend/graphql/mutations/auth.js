// const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const { GraphQLString } = require('graphql')

const User = require('../../models/user')
// const UserType = require('../types/user')

module.exports = {
  authSignin: {
    description: 'Add a file',
    type: GraphQLString,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString }
    },
    async resolve (root, { email, password }) {
      const user = await User.findOne({ email })

      if (!user) {
        throw new Error('No user with that email')
      }

      const valid = true // await bcrypt.compare(password, user.password)

      if (!valid) {
        throw new Error('Incorrect password')
      }

      // return json web token
      return jsonwebtoken.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      )
    }
  }
}
