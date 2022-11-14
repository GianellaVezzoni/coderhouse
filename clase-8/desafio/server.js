const express = require("express");
let products = require("./products");
const multer = require('multer');
const { Router } = express;
const app = express();
const PORT = 8080;
const productsRouter = new Router();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

productsRouter.get("/", (_, res) => {
  try {
    res.send({
      status: "success",
      productos: products,
    });
  } catch (err) {
    res.send({
      status: "error",
      err: err,
    });
  }
});

productsRouter.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const productFounded = products.find(
      (element) => element.id === parseInt(id)
    );
    if (productFounded) {
      res.send({
        status: "success",
        producto: productFounded,
      });
    } else {
      res.send({
        status: "success",
        error: `Producto no encontrado`,
      });
    }
  } catch (err) {
    res.send({
      status: "error",
      error: err,
    });
  }
});

//multer config
const storage = multer.diskStorage({
  destination: function(req, file, next){
    next(null, 'uploads');
  },
  filename: function(req, file, next){
    next(null, `${file.originalname}`);
  }
});

const upload = multer({storage: storage});
//end multer config

productsRouter.post("/", upload.single('productFile'), (req, res) => {
  try{
    const lastIdArray = products[products.length -1].id + 1;
    const file = req.file;
    if(!file){
      const error = new Error('Error, no se subió ningún archivo');
      res.send({
        status: "error",
        error: error,
      });
    }
    const {body} = req;
    products.push({
      ...body,
      id: lastIdArray,
      thumbnail: file.path
    });
    res.send({
      status: "success",
      message: `Producto cargado con éxito. ID asignado ${lastIdArray}`,
    });
  }catch(err){
    res.send({
      status: "error",
      error: 'Error al crear un producto',
    });
  }
});

productsRouter.put("/:id", (req, res) => {
  try{
    const {id} = req.params;
    const {title, price, thumbnail} = req.body;
    const productFounded = products.findIndex(element => element.id === parseInt(id));
    if(productFounded > -1){
      products[productFounded] = {
        id: products[productFounded].id,
        title: title ? title : products[productFounded].title,
        price: price ? price : products[productFounded].price,
        thumbnail: thumbnail ? thumbnail : products[productFounded].thumbnail
      };
      res.send({
        status: "success",
        message: 'Producto actualizado con éxito!',
        product: products[productFounded]
      });
    }else{
      res.send({
        status: "error",
        error: `Error, no se encontró un producto con id ${id}`
      });
    }
  }catch(err){
    res.send({
      status: "error",
      error: err,
    });
  }
});

productsRouter.delete("/:id", (req, res) => {
  try{
    const {id} = req.params;
    const productsFiltered = products.filter(element => element.id !== parseInt(id));
    products = productsFiltered;
    res.send({
      status: "success",
      message: 'Producto eliminado con éxito!',
      product: products
    });
  }catch(err){
    res.send({
      status: "error",
      error: 'Error al eliminar un producto',
    });
  }
});

app.use("/api/productos", productsRouter);

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
server.on("error", (err) =>
  console.log(`Error al ejecutar el servidor ${err}`)
);
