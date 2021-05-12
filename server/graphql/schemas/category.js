const { gql } = require("apollo-server-express");
module.exports = gql`
  type Category {
    id_category: ID!
    type: String
    description: String
    status: String
  }
type Query {
    getAllCategories: [Category]
}
type Mutation {
    addCategory(category: CategoryInput): Category!
}
input CategoryInput {
    type: String
    description: String
    status: String
}
`;
