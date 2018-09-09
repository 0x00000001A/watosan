import gql from 'graphql-tag'

const getAll = gql`
  {
    subscribers {
      id
      email
      token
    }
  }
`
const create = gql`
  mutation subscriberCreate($email: String!, $captcha: String!) {
    subscriberCreate(email: $email, captcha: $captcha) {
      id
      email
      token
    }
  }
`

const remove = gql`
  mutation subscriberRemove($id: String!, $token: String!) {
    subscriberRemove(id: $id, token: $token) {
      id
      email
      token
    }
  }
`

export default {
  getAll,
  create,
  remove
}
