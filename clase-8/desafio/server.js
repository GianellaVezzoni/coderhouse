const express = require('express');
const {Router} = express;
const app = express();

const productsRouter = new Router();

productsRouter.get('/', (req, res) => {
    
});

app.use('/api/productos', productsRouter);

const server = app.listen(PORT, ()=> {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})