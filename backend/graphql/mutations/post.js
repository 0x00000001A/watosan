const getSlug = require('speakingurl')
const { GraphQLNonNull, GraphQLString, GraphQLList, GraphQLBoolean } = require('graphql')

const Post = require('../../models/post')
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

    resolve (root, data) {
      return new Post({
        slug: getSlug(data.title),
        tags: data.tags,
        title: data.title,
        image: data.image,
        short: data.short,
        content: data.content,
        scratch: data.scratch,
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
    async resolve (root, { id }) {
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

    async resolve (root, data) {
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
      ).save().exec()
    }
  }
}
