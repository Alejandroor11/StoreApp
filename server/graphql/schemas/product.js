const { gql } = require("apollo-server-express");
module.exports = gql`
  type Product {
    id_product: ID!
    name: String
    price: Float
    description: String
    image: String
    quantity: String
    status: String
    categories: [Category!]
  }
  type Query {
    getSingleProduct(id_product: Int!): Product
    getAllProducts: [Product]
}
`;
