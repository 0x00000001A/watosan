import gql from 'graphql-tag'

const getAll = gql`
  {
    files {
      id
      filename
    }
  }
`

const create = gql`
  mutation fileCreate ($file:Upload!) {
    fileCreate(file:$file) {
      id
      filename
    }
  }
`

const remove = gql`
  mutation fileRemove($id: String!) {
    fileRemove(id: $id) {
      id
      filename
    }
  }
`

export default {
  getAll,
  create,
  remove
}
