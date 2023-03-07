import { prodContainer } from "../routes/index.js";

export async function getProducts(req, res) {
  if (req.params.id) {
    const products = await prodContainer.getAll();
    res
      .status(200)
      .json({ status: "Productos obtenidos con éxito", products: products });
  } else {
    const productById = await prodContainer.getById(req.params.id);
    res
      .status(200)
      .json({ status: "Producto obtenido con éxito", product: productById });
  }
}

export async function deleteProductById(req, res) {
  const productId = await prodContainer.deleteById(req.params.id);
  res
    .status(200)
    .json({ status: "Productos eliminados con éxito", product: productId });
}

export async function saveProducts(req, res) {
  const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
  const productData = {
    timestamp: Date.now(),
    nombre,
    precio,
    descripcion,
    foto,
    stock,
    codigo,
  };
  const productCreated = await prodContainer.save(productData);
  res
    .status(201)
    .json({
      status: "Producto creado con éxito",
      newProductId: productCreated,
    });
}

export async function updateProduct(req, res) {
  const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
  const productData = {
    timestamp: Date.now(),
    nombre,
    precio,
    descripcion,
    foto,
    stock,
    codigo,
  };
  const id = await prodContainer.update(req.params.id, productData);
  res
    .status(200)
    .json({
      status: "Producto actualizado con éxito",
      updatedProduct: [prodContainer.getById(id)],
    });
}
