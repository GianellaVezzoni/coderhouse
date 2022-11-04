//Ejercicio 1
const numbers = {};

function generateNumbers() {
  return parseInt(Math.random() * 20) + 1;
}

for (let i = 1; i <= 10000; i++) {
  const number = generateNumbers();
  if (!numbers[number]) {
    numbers[number] = 0;
  }

  numbers[number]++;
}

console.log("Numeros salidos ", numbers);

//Ejercicio 2
const productos = [
  { id: 1, nombre: "Escuadra", precio: 323.45 },
  { id: 2, nombre: "Calculadora", precio: 234.56 },
  { id: 3, nombre: "Globo Terráqueo", precio: 45.67 },
  { id: 4, nombre: "Paleta Pintura", precio: 456.78 },
  { id: 5, nombre: "Reloj", precio: 67.89 },
  { id: 6, nombre: "Agenda", precio: 78.9 },
];

//Mostrar los nombres de los productos en un string separados por comas
function showNames(productosArray) {
  const prodNames = [];
  for (const product of productosArray) {
    prodNames.push(product.nombre);
  }
  return prodNames;
}
showNames(productos);

// Mostrar el precio total
function showTotalPrice(productos) {
  let total = 0;
  for (const product of productos) {
    total += product.precio;
  }
  return to2Decim(total);
}

function to2Decim(val) {
  return Number(val.toFixed(2));
}
console.log(showTotalPrice(productos));

//Mostrar el promedio
function showProm(prod) {
  if (prod.length === 0) {
    return 0;
  }
  return showTotalPrice(prod) / prod.length;
}
console.log(showProm(productos));

//Mostrar producto con el menor precio
function smallerPrice(prods) {
  if (prods.length === 0) {
    return 0;
  }
  let smallerPrice = productos[0].precio;
  let smallerPriceName = productos[0].nombre;
  for (const product of prods) {
    if (product.precio < smallerPrice) {
      smallerPrice = product.precio;
      smallerPriceName = product.nombre;
    }
  }
  return `El producto mas barato es ${smallerPriceName} con un precio de $${smallerPrice}`;
}
console.log(smallerPrice(productos));

//Mostrar producto con el mayor precio
function biggerPrice(prods) {
  if (prods.length === 0) {
    return 0;
  }
  let smallerPrice = prods[0].precio;
  let smallerPriceName = prods[0].nombre;
  for (const product of prods) {
    if (product.precio > smallerPrice) {
      smallerPrice = product.precio;
      smallerPriceName = product.nombre;
    }
  }
  return `El producto mas caro es ${smallerPriceName} con un precio de $${smallerPrice}`;
}
console.log(biggerPrice(productos));

const info = {
  nombre: showNames(productos),
  totalPrecio: showTotalPrice(productos),
  promedio: showProm(productos),
  prodMasBarato: smallerPrice(productos),
  prodMasCaro: biggerPrice(productos),
};
console.log("Info obj ", info);
