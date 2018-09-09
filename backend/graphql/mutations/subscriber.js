
const path = require('path')
const axios = require('axios')
const dotenv = require('dotenv')
const { GraphQLString } = require('graphql')

const Subscriber = require('../../models/subscriber')
const SubscriberType = require('../types/subscriber')

dotenv.config({
  silent: true,
  path: path.resolve(__dirname, '.env')
})

function generateToken () {
  return new Promise((resolve, reject) => {
    require('crypto').randomBytes(48, (error, buffer) => {
      if (error) {
        reject(error)
      } else {
        resolve(buffer.toString('hex'))
      }
    })
  })
}

module.exports = {
  subscriberCreate: {
    type: SubscriberType,
    args: {
      email: { type: GraphQLString },
      captcha: { type: GraphQLString }
    },
    async resolve (root, { email, captcha }, { remoteip }) {
      const recaptchaData = {
        secret: process.env.RECAPTCHA_SECRET,
        response: captcha,
        remoteip
      }

      const result = await axios({
        method: 'post',
        url: 'https://www.google.com/recaptcha/api/siteverify',
        data: recaptchaData,
        params: recaptchaData
      })

      if (result.data.success === true) {
        const token = await generateToken()
        return new Subscriber({ email, token }).save()
      } else {
        throw new Error('Captcha should be solved')
      }
    }
  },

  subscriberRemove: {
    type: SubscriberType,
    args: {
      id: { type: GraphQLString },
      token: { type: GraphQLString }
    },
    async resolve (root, { id, token }, { user }) {
      return Subscriber.deleteOne({ _id: id, token }).exec()
    }
  }
}
