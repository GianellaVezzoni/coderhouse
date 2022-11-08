const express = require("express");
const app = express();
const PORT = 8080;
const frase = "Hola mundo cómo están";

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

server.on("error", (err) => console.log("Error al ejecutar el servidor ", err));
//Para que el servidor express pueda interpretar en forma automática mensajes de tipo JSON
//en formato urlencoded
app.use(express.json());
//Sin estas lineas, el servidor no sabrá como interpretar los objetos recibidos
app.use(express.urlencoded({ extended: true }));

app.get("/api/frase", (req, res) => {
  res.json({ frase: frase });
});

app.get("/api/letras/:num", (req, res) => {
  const { num } = req.params;
  if (isNaN(num)) {
    return res.json({ error: "El parametro ingresado no es un número" });
  }

  if (num < 1 || num > frase.length) {
    return res.json({ error: "El parametro ingresado esta fuera de rango" });
  }

  res.json({letra: frase[num - 1]});
});

app.get("/api/palabras/:num", (req, res) => {
  const { num } = req.params;
  if (isNaN(num)) {
    return res.json({ error: "El parametro ingresado no es un número" });
  }
  const palabras = frase.split(' ');
  if (num < 1 || num > palabras.length) {
    return res.json({ error: "El parametro ingresado esta fuera de rango" });
  }

  res.json({palabra: palabras[num - 1]});
});
