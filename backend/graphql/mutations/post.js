const getSlug = require('speakingurl')
const nodemailer = require('nodemailer')
const textversion = require('textversionjs')

const { ForbiddenError } = require('apollo-server-express')
const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} = require('graphql')

const Post = require('../../models/post')
const Subscriber = require('../../models/subscriber')

const PostType = require('../types/post')

module.exports = {
  postCreate: {
    description: 'Add a post',
    type: PostType,
    args: {
      tags: { type: GraphQLList(GraphQLString) },
      title: { type: GraphQLString },
      image: { type: GraphQLString },
      short: { type: GraphQLString },
      content: { type: GraphQLString },
      scratch: { type: GraphQLBoolean },
      description: { type: GraphQLString }
    },

    async resolve (root, data, { user }) {
      if (!user) {
        throw new ForbiddenError('Unauthorized')
      }

      if (!data.scratch) {
        const subscribers = await Subscriber.find().exec()
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secure: process.env.SMTP_SECURE,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          },
          tls: {
            rejectUnauthorized: false
          }
        })

        subscribers.forEach((recepient) => {
          const additional = `
            <p>
              Read more:
              ${process.env.BASE_URL}/posts/${getSlug(data.title)}
            </p>
            <hr/>
            <p style="background-color: #eee; padding: 15px;">
              Unsubscribe link:
              ${process.env.BASE_URL}/unsubscribe?id=${recepient.id}&token=${recepient.token}
            </p>
          `

          transporter.sendMail({
            from: 'noreply@mail.watosan.org',
            to: recepient.email,
            subject: data.title,
            text: textversion(data.short) + additional,
            html: data.short + additional
          })
        })
      }

      return new Post({
        slug: getSlug(data.title),
        tags: data.tags,
        title: data.title,
        image: data.image,
        short: data.short,
        content: data.content,
        mailed: !!data.scratch,
        scratch: !!data.scratch,
        description: data.description
      }).save()
    }
  },

  postRemove: {
    type: PostType,
    description: 'Remove post',
    args: {
      id: { type: GraphQLNonNull(GraphQLString) }
    },
    async resolve (root, { id }, { user }) {
      if (!user) {
        throw new ForbiddenError('Unauthorized')
      }

      const postForDelete = await Post.findById(id).exec()
      let query

      if (postForDelete.scratch) {
        query = Post.deleteOne(
          { _id: postForDelete._id }
        )
      } else {
        query = Post.updateOne(
          { _id: postForDelete._id },
          { scratch: true }
        )
      }

      return query.exec()
    }
  },

  postUpdate: {
    description: 'Update a post',
    type: PostType,
    args: {
      id: { type: GraphQLString },
      tags: { type: GraphQLList(GraphQLString) },
      title: { type: GraphQLString },
      image: { type: GraphQLString },
      short: { type: GraphQLString },
      content: { type: GraphQLString },
      scratch: { type: GraphQLBoolean },
      description: { type: GraphQLString }
    },

    async resolve (root, data, { user }) {
      if (!user) {
        throw new ForbiddenError('Unauthorized')
      }

      const original = await Post.findById(data.id).exec()
      const newSlug = getSlug(data.title)
      let slug = original.slug

      if (slug !== newSlug) {
        slug = newSlug
      }

      return Post.findOneAndUpdate(
        { _id: original._id },
        {
          $set: {
            slug,
            tags: data.tags,
            title: data.title,
            image: data.image,
            short: data.short,
            content: data.content,
            scratch: data.scratch,
            description: data.description
          }
        },
        { new: true }
      ).exec()
    }
  }
}
