const http = require('http');
//Como crear un servidor web escuchando un puerto dato
const server = http.createServer((req, res) => {
    res.end('Hola mundo')
});

const connectedServer = server.listen(8080, () => {
    console.log(`El servidor esta corriendo en el puerto ${connectedServer.address().port}`);
});

