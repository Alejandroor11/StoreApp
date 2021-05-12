const { gql } = require('apollo-server-express')
module.exports = gql`
type User {
    id_user: ID!
    document: Int!
    name: String!
    email: String!
    password: String!
    status: Int!
}
 type AuthPayload {
    status: Boolean
    token: String!
    user: User!
  }
 type Query {
   getSingleUser(id: ID!): User
   getAllUsers: [User!]!
   me: User
 }
 type Mutation {
    registerUser(document: Int!,
      name: String!,
      email: String!,
      password: String!,
      status: Int
      ): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    updateUser(id_user: ID!,
      document: Int,
      name: String,
      email: String,
      username: String,
      password: String,
      status: Int
      ): User!
  }
`;
