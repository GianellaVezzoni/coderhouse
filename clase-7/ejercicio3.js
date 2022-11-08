const express = require("express");
const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const palabras = ["frase", "inicial"];

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

server.on("error", (err) => console.log("error al iniciar el servidor ", err));

//Ejercicio 1
app.get("/api/frase", (req, res) => {
  res.json({ frase: palabras.join(" ") });
});

//Ejercicio 2
app.get("/api/palabras/:pos", (req, res) => {
  const num = req.params.pos;
  res.json({ buscada: palabras[parseInt(num) - 1] });
});

//Ejercicio 3
app.post("/api/palabras", (req, res) => {
  const { palabra } = req.body;
  palabras.push(palabra);

  res.json({ agregada: palabra, posicion: palabras.length - 1 });
});

//Ejercicio 4
app.put("/api/palabras/:num", (req, res) => {
  const { num } = req.params;
  const { palabra } = req.body;
  const palabraAnterior = palabras[parseInt(num) - 1];
  palabras[parseInt(num) - 1] = palabra;
  res.json({ actualizada: palabra, palabraAnterior: palabraAnterior });
});

//Ejercicio 5
app.delete("/api/palabras/:num", (req, res) => {
  const { num } = req.params;
  const palabraEliminada = palabras.splice(parseInt(num) - 1);
  res.json({ palabraEliminada: palabraEliminada });
});
