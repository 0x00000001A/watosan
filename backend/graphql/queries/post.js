const { GraphQLString, GraphQLList } = require('graphql')

const Post = require('../../models/post')
const PostType = require('../types/post')

const queries = {
  post: {
    type: PostType,
    description: 'Find a Post by slug',
    args: {
      slug: { type: GraphQLString }
    },
    resolve (parent, { slug }) {
      return Post.findOne({ slug }).exec()
    }
  },

  postById: {
    type: PostType,
    description: 'Find a Post by id',
    args: {
      id: { type: GraphQLString }
    },
    resolve (parent, { id }) {
      return Post.findOne({ _id: id }).exec()
    }
  },

  posts: {
    type: GraphQLList(PostType),
    description: 'Get all posts',
    resolve (parent, { id }, { user }) {
      const filters = user ? {} : { scratch: false }
      return Post.find(filters).sort({ _id: -1 }).exec()
    }
  },

  postsByTag: {
    type: GraphQLList(PostType),
    description: 'Get all posts by tag',
    args: {
      tag: { type: GraphQLString }
    },
    resolve (parent, { tag }) {
      return Post.find({ tags: { $in: [tag] } }).sort({ _id: -1 }).exec()
    }
  }
}

module.exports = queries
