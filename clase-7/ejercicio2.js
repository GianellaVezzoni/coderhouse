const express = require("express");
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

server.on("error", (err) => console.log("error al iniciar el servidor ", err));

//Ejercicio 1

app.get("/api/sumar/:num1/:num2", (req, res) => {
  const { num1, num2 } = req.params;
  res.json({ resultado: Number(num1) + Number(num2) });
});

app.get("/api/sumar", (req, res) => {
  const { num1, num2 } = req.params;
  res.json({ suma: Number(num1) + Number(num2) });
});

app.get("/api/operacion/:operacion", (req, res) => {
  const { operacion } = req.params;
  res.json({ operacion: eval(operacion) });
});

//Ejercicio 2
app.post("/api", (req, res) => {
  res.json({ status: "ok" });
});

app.put("/api", (req, res) => {
  res.json({ status: "ok" });
});

app.delete("/api", (req, res) => {
  res.json({ status: "ok" });
});
