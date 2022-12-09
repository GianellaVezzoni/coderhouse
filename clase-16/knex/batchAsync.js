const {options} = require("./options/db.js");
const knex = require("knex")(options);

const cars = []

(async () => {
    try{
        //Borramos todos los datos
        await knex('cars').del()

        //Insertamos datos
        await knex('cars').inserts(cars)

        //Leemos todos los autos
        let rows = await knex.from('cars').select("*")
        for(row of rows) console.log(`${row['id']} ${row['name']} ${row['price']}`)
    }catch(err){
        console.log('err', err);
    }
    finally {
        knex.destroy();
    }
})