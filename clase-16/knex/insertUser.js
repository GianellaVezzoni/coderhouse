const {options} = require("./options/db.js");
const knex = require("knex")(options);

const usuarios = [
    {nombre: "Gianella", apellido: "Vezzoni", edad: 21, email: "vezzoni.00@gmail.com"},
    {nombre: "Pepe", apellido: "Botella", edad: 50, email: "pepe.00@gmail.com"},
    {nombre: "Chanchi", apellido: "Vezzoni", edad: 9, email: "chaaaanchi.00@gmail.com"}
];

knex('usuario').insert(usuarios)
    .then(() => console.log("usuarios insertados con exito"))
    .catch((err) => console.log(err))
    .finally(() => knex.destroy());