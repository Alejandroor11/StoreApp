const { gql } = require("apollo-server-express");
module.exports = gql`
  type Order {
    id_order: ID!
    total: Float!
    createdAt: String
    updatedAt: String
    users: [User!]
  }
type Query {
    getAllOrders: [Order!]!
    getSingleOrder(id_order: ID!): [Order!]!
}
type Mutation {
    createOrder(order: OrderInput): Order!
}
input OrderInput {
    id_product: [Int!]
    price: [Float!]
    quantity: [Float!]
    subtotal: [Float!]
    total: Float
    id_user: Int
}
`;
