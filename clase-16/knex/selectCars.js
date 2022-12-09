const {options} = require("./options/db.js");
const knex = require("knex")(options);

knex.from('cars').select("name", "price").where("price", ">", "50000")
    .then((rows) => {
        for (row of rows){
            console.log(`${row['name']} ${row['price']}`)
        }
    })
    .catch((err) => console.log('err ', err))
    .finally(() => knex.destroy());


knex.from('cars').select("name", "price").orderBy("price", "desc")
    .then((rows) => {
        for (row of rows){
            console.log(`${row['name']} ${row['price']}`)
        }
    })
    .catch((err) => console.log('err ', err))
    .finally(() => knex.destroy());