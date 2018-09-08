const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const { GraphQLString } = require('graphql')

const User = require('../../models/user')

module.exports = {
  authSignin: {
    description: 'Add a file',
    type: GraphQLString,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString }
    },
    async resolve (root, { email, password }, context) {
      let user = await User.findOne({ email })

      if (!user) {
        const count = await User.count().exec()

        if (!count) {
          const hash = await bcrypt.hash(password, 10)
          user = await new User({ email, password: hash }).save()
        } else {
          throw new Error('No user with that email')
        }
      }

      const valid = await bcrypt.compare(password, user.password)

      if (!valid) {
        throw new Error('Incorrect password')
      }

      context.user = user

      return jsonwebtoken.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      )
    }
  }
}
