const {options} = require("./options/db.js");
const knex = require("knex")(options);

knex.from('cars').del()
    .then(() => console.log('cars deleted'))
    .catch((err) => console.log('err ', err))
    .finally(() => knex.destroy());

knex.from('cars').where('price', '>', '9500').del()
    .then(() => console.log('cars deleted'))
    .catch((err) => console.log('err ', err))
    .finally(() => knex.destroy());