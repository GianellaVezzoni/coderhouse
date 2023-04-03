import { buildSchema } from "graphql";

export const productSchema = buildSchema(
    `
        type Product {
            id: ID!,
            title: String,
            price: Float,
            thumb: String,
        }

        input ProductInput {
            title: String,
            price: Float,
            thumb: String,
        }

        type Query {
            getProducts: [Product],
            getProduct(id: ID!): Product,
        }

        type Mutation {
            postProduct(data: ProductInput): Product
            updateProduct(id: ID!, data: ProductInput): Product
            deleteProduct(id: ID!): String
        }
    `
)