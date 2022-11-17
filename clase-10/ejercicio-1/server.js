// http://localhost:8000/datos?min=10&nivel=15&max=20&titulo=%3Ci%3EMedidor%3C/i%3E

const express = require("express");
const app = express();

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/datos", (req, res) => {
 res.render("nivel", req.query);
});

const server = app.listen(8080, () => {
 console.log("Servidor corriendo en el puerto 8080");
});
