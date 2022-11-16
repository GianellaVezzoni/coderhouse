const express = require('express');
const app = express();

app.use(express.static('public'));
const server = app.listen(8080, () => {
    console.log(`Servidor corriendo en el puerto 8080`)
})