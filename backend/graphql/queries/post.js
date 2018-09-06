const { GraphQLString, GraphQLList } = require('graphql');

const Post = require('../../models/post');
const PostType = require('../types/post');

const queries = {
  post: {
    type: PostType,
    description: 'Find a Post by id',
    args: {
      slug: { type: GraphQLString }
    },
    async resolve(parent, { slug }) {
      return await Post.findOne({ slug }).exec();
    }
  },

  posts: {
    type: GraphQLList(PostType),
    description: 'Get all posts',
    async resolve() {
      return await Post.find({ scratch: false }).sort({ _id: -1 }).exec()
    }
  },

  postsByTag: {
    type: GraphQLList(PostType),
    description: 'Get all posts by tag',
    args: {
      tag: { type: GraphQLString }
    },
    async resolve(parent, { tag }) {
      return await Post.find({ tags: { $in : [tag] } }).sort({ _id: -1 }).exec()
    }
  }
};

module.exports = queries;
