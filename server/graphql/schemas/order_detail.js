const { gql } = require("apollo-server-express");
module.exports = gql`
  type Order_detail {
    id_order_detail: ID!
    quantity: Float!
    subtotal: Float!
    orders: [Order!]
    products: [Product!]
  }
type Query {
    getAllODetails: [Order_detail]
    getSingleODetail: [Order_detail]
}
`;
