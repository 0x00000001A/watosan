const { GraphQLString, GraphQLList } = require('graphql')

const Post = require('../../models/post')
const PostType = require('../types/post')

const queries = {
  post: {
    type: PostType,
    description: 'Find a Post by id',
    args: {
      slug: { type: GraphQLString }
    },
    resolve (parent, { slug }) {
      return Post.findOne({ slug }).exec()
    }
  },

  posts: {
    type: GraphQLList(PostType),
    description: 'Get all posts',
    resolve () {
      return Post.find({ scratch: false }).sort({ _id: -1 }).exec()
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
