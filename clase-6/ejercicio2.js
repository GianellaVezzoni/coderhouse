const express = require("express");
const app = express();
const PORT = 8081;

///////////////// Ejercicio A ////////////////////////
const server = app.listen(PORT, () => {
  console.log(`Server escuchando en el puerto ${PORT}`);
});

server.on("error", (error) => console.log("Error en el servidor ", error));

//send es cuando es texto y render es cuando es una vista
app.get("/", (req, res) => {
  res.send('<h1 style="color:blue;">Bienvenidos al servidor express</h1>');
});

///////////////// Ejercicio B ////////////////////////

let cantidadVisitas = 0;
app.get("/visitas", (req, res) => {
  res.send(`Cantidad de visitas: ${++cantidadVisitas}`);
});

///////////////// Ejercicio C ////////////////////////

app.get("/fyh", (req, res) => {
  res.send({ fyh: new Date().toLocaleString() });
});
