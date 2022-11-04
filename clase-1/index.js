console.log("Hola mundo");
console.error("Error del console error");

//Se vieron los tipos de variables y tipos de datos
let texto = "Hola, soy Gianella";

//Creacion de funciones clasicas o funciones de flecha
const showMessage = (message) => {
  console.log(`Mensaje funcion flecha: ${message}`);
};

function showMessage2(message) {
  console.log(`Mensaje funcion clasica: ${message}`);
}

showMessage(texto);
showMessage2(texto);

//Const y mutabilidad
const user = {
  name: "",
};

user.name = "Gianella";
console.log("Obj mutado ", user);

console.log("============= Ejercicio =================");
//Ejercicio

const user2 = {
  name: "Gianella",
  age: 21,
  series: ["Greys Anatomy", "Game of thrones", "Breaking bad"],
  movies: [
    {
      movieName: "Iron Man",
      year: 2008,
      actors: ["Robert D. Junior", " Jon Favreau"],
    },
    {
      movieName: "Mulan",
      year: 2000,
      actors: ["Ni idea"],
    },
  ],
};

console.log("Nombre: ", user2.name);
console.log("Edad: ", user2.age);
console.log("-------- Series --------");
user2.series.map((item) => console.log("Nombre serie: ", item));
console.log("-------- Películas --------");
user2.movies.map((item) => {
  console.log(`Nombre peli: ${item.movieName}`);
  console.log(`Año peli: ${item.year}`);
  console.log(`Actores: ${item.actors}`);
  console.log("-----------------");
});
