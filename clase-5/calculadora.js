const moment = require("moment");

const hoy = moment();
const nacimiento = moment("07/06/2001", "DD/MM/YYYY");

const diferencia = hoy.diff(nacimiento, "years");
const diferenciaDias = hoy.diff(nacimiento, "days");

console.log(`Hoy es ${hoy.format("DD/MM/YYYY")}`);
console.log(`Nací el ${nacimiento.format("DD/MM/YYYY")}`);
console.log(`Desde mi nacimiento han pasado ${diferencia} años`);
console.log(`Desde mi nacimiento han pasado ${diferenciaDias} días`);
