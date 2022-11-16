const express = require('express');
const app = express();

app.engine('bokita', async(filePath, options, callback) => {
    try{
        // const template = await 
    }
});


app.use(express.static('public'));
const server = app.listen(8080, () => {
    console.log(`Servidor corriendo en el puerto 8080`)
})