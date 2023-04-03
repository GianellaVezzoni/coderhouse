import {graphqlHTTP} from 'express-graphql';
import ProductReponsitory from '../repo/products.js'
import {productSchema} from '../models/schemas/graphel_products';

const productsRepository = new ProductReponsitory();

async function getProducts () {
    try {
        return await productsRepository.getAll();
    } catch (error) {
        req.logError(error);
    }
}

async function getProduct ({id}) {
    try {
        return await productsRepository.getById(id);
      } catch (error) {
        req.logError(error);
      }
}

async function postProduct({productData}) {
    const {title, price, thumb} = productData;
    try {
        return await productsRepository.save({title, price, thumb});
      } catch (error) {
        req.logError(error);
      }
}

async function deleteProduct({productId}) {
    try {
        return await productsRepository.deleteById(productId);
      } catch (error) {
        req.logError(error);
      }
}

async function updateProduct({productId, productData}) {
    const { title, price, thumb } = productData;
    try {
        return await productosR.update(productId,{id, title, price, thumb});
      } catch (error) {
        req.logError(error);
      }
}

export const productGraphQl = new graphqlHTTP({
    schema: productSchema,
    rootValue: {
      getProducts,
      getProduct,
      postProduct,
      updateProduct,
      deleteProduct,
    },
    graphiql: true,
})