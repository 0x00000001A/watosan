import gql from 'graphql-tag'

const getById = gql`
  query postById($id: String!){
    postById(id: $id) {
      id
      slug
      tags
      date
      title
      image
      short
      content
      scratch
      description
    }
  }
`

const getByTag = gql`
  query postsByTag($tag: String!){
    postsByTag(tag: $tag) {
      id
      slug
      date
      tags
      title
      short
    }
  }
`

const get = gql`
  query post($slug: String!){
    post(slug: $slug) {
      id
      slug
      tags
      date
      title
      image
      short
      content
      scratch
      description
    }
  }
`

const getAll = gql`
  {
    posts {
      id
      slug
      date
      tags
      title
      short
    }
  }
`
const create = gql`
  mutation postCreate($tags: [String], $title: String!, $image: String, $short: String!, $content: String!, $scratch: Boolean, $description: String!) {
    postCreate(tags: $tags, title: $title, image: $image, short: $short, content: $content, scratch: $scratch, description: $description) {
      id
      slug
      tags
      date
      title
      image
      short
      content
      scratch
      description
    }
  }
`

const update = gql`
  mutation postUpdate($id: String!, $tags: [String], $title: String!, $image: String, $short: String!, $content: String!, $scratch: Boolean!, $description: String!) {
    postUpdate(id: $id, tags: $tags, title: $title, image: $image, short: $short, content: $content, scratch: $scratch, description: $description) {
      id
      slug
      tags
      date
      title
      image
      short
      content
      scratch
      description
    }
  }
`

const remove = gql`
  mutation postRemove($id: String!) {
    postRemove(id: $id) {
      id
    }
  }
`

export default {
  get,
  getAll,
  getById,
  getByTag,
  create,
  update,
  remove
}
