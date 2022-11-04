const express = require("express");
const Contenedor = require("./Contenedor");

const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
server.on("error", (error) => console.log(`Error en el servidor ${error}`));

app.get("/productos", (req, res) => {
  const containerObj = new Contenedor("productos.txt");
  containerObj
    .getAll()
    .then((prodPromise) => {
      if (prodPromise !== null) {
        res.send(prodPromise);
      } else {
        res.send("No se encontraron productos para listar.");
      }
    })
    .catch((_) => res.send("Hubo un error al obtener el listado de productos"));
});

app.get("/productoRandom", (req, res) => {
  const numberRandom = parseInt(Math.random() * 10);
  const containerObj2 = new Contenedor("productos.txt");
  containerObj2
    .getById(numberRandom)
    .then((product) => {
      if (product !== null) {
        res.send(
          `<h3>Producto elegido: ${product.title}</h3> <img width="30%" height="30%" src=${product.thumbnail} /> <p>Precio: $${product.price}</p>`
        );
      } else {
        res.send(
          `<p>No se encontró un producto con el id: ${numberRandom}</p>`
        );
      }
    })
    .catch((_) => res.send("Hubo un error al elegir un producto"));
});
