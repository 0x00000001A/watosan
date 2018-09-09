const {
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLObjectType
} = require('graphql')

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: {
      type: GraphQLString
    },
    slug: {
      type: GraphQLString,
      description: `Post url`
    },
    title: {
      type: GraphQLString,
      description: `Post title`
    },
    description: {
      type: GraphQLString,
      description: `For meta tag`
    },
    tags: {
      type: GraphQLList(GraphQLString),
      description: `List of tags`
    },
    image: {
      type: GraphQLString,
      description: `Post image. Mostly for the OpenGraph and TwitterCard`
    },
    short: {
      type: GraphQLString,
      description: 'Short post content'
    },
    content: {
      type: GraphQLString,
      description: 'Full post content'
    },
    date: {
      type: GraphQLString,
      description: 'Publish date'
    },
    mailed: {
      type: GraphQLBoolean,
      description: 'Indicates, if post has been sent to subscribers'
    },
    scratch: {
      type: GraphQLBoolean,
      description: 'Post visiblity'
    }
  }
})

module.exports = PostType
