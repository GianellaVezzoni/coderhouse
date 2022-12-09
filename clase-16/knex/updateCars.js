const {options} = require("./options/db.js");
const knex = require("knex")(options);

knex.from('cars').select("price", "90000").update({price: 9500})
    .then(() => console.log('car updated'))
    .catch((err) => console.log('err ', err))
    .finally(() => knex.destroy());
