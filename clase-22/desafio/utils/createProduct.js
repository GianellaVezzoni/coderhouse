const faker = require("faker");
faker.locale = 'es';

module.exports = function createProduct(){
    console.log('en el crear producto fake')
    return {
        name: faker.commerce.productName(),
        price: faker.commerce.price(100, 200, 0, '$'),
        picture: faker.image.abstract()
    }
}