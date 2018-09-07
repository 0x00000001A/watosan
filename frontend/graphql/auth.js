import gql from 'graphql-tag'

const signin = gql`
  mutation authSignin($email:String!, $password:String!){
    authSignin(email: $email, password: $password)
  }
`

export default {
  signin
}
