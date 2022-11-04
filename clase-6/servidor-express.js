const express = require('express');
const app = express();

const PORT = 8080;
const server = app.listen((PORT, {}) => {
    console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});

server.on("error", error => console.log(`Error en servidor ${error}`));

//Configuracion peticion get
app.get('/', (req, res) => {
    res.send({message: 'hola mundo'});
});

