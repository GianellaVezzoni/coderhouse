const express = require('express');
const ProductContainer = require('../persistence/ProductContainer');
const router = express.Router();
const fileName = '../utils/products.txt';

router.get('/:id?', (req, res) => {
    try{
        const {id} = req?.params;
        const product = new ProductContainer(fileName);
        let productData = [];
        if(id){
            productData = product.getProductsById(id);
        }else{
            productData = product.getProducts();
        }
        if(productData.length){
            return res.status(200).json({
                status: 'success',
                products: productData
            });
        }else{
            return res.status(200).json({
                status: 'success',
                products: productData,
                message: 'No se encontraron productos'
            });
        }
    }catch(err){
        return res.status(err.response.status).json({
            status: 'error',
            error: err
        })
    }
});

router.post('/', () => {
    
});

router.put('/:id', () => {
    
});

router.delete('/:id', () => {
    
});


module.exports = router;