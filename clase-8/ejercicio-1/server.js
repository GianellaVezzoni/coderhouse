const express = require('express');
const {Router} = express;
const app = express();
const mascotas = [];
const personas = [];

const routerMacotas = new Router();
const routerPersonas = new Router();
//Le damos acceso a la carpeta public, al archivo index
app.use(express.static('public'));

routerMacotas.get('/', (_, res) => {
    res.json(mascotas);
});

routerPersonas.get('/', (_, res) => {
    res.json(personas);
});

app.use('/mascotas', routerMacotas);
app.use('/personas', routerPersonas);

const server = app.listen(8080, () => {
    console.log("Escuchando el 8080")
});