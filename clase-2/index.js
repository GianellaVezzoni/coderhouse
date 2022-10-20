//Ejercicio 1
console.log("------------ Ejercicio 1 -------------");
const showList = (list) => {
  console.log(list.length ? list : "Lista vacía");
};

const animalList = ["perro", "gato", "pajaro", "ballena"];
showList(animalList);
const emptyList = [];
showList(emptyList);

//Ejercicio 2
console.log("----------- Ejercicio 2 -------------");
const numbers = [1, 2, 3];
let func = function (list) {
  console.log(list.length ? list : "Lista vacía");
};
func(numbers);
func(emptyList);

//Ejercicio 3
console.log("----------- Ejercicio 3 -------------");
let multiplicar = function (number1, number2) {
  console.log(`Producto: ${number1 * number2}`);
};

let duplicar = function (number1) {
  console.log(`Duplicar: ${number1 * 2}`);
};

let triplicar = function (number1) {
  console.log(`Triplicar: ${number1 * 3}`);
};

const crearMultiplicador = (number1) => {
  multiplicar(number1, 8);
  duplicar(number1);
  triplicar(number1);
};

crearMultiplicador(2);
