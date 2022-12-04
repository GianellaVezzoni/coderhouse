const fs = require("fs");

module.exports = class ProductContainer {
 constructor(fileName) {
  this.fileName = fileName;
 }

 async getProducts() {
  try {
   if (fs.existsSync(this.fileName)) {
    const file = await fs.promises.readFile(this.fileName, "utf-8");
    return JSON.parse(file);
   } else {
    await fs.promises.writeFile(this.fileName, JSON.stringify([]), "utf-8");
    return [];
   }
  } catch (err) {
   throw new Error("Error al listar todos los elementos del archivo ", err);
  }
 }

 async getProductsById(productId) {
  try {
   const file = await fs.promises.readFile(this.fileName, "utf-8");
   const elementFounded = JSON.parse(file).find(
    (element) => element.id === parseInt(productId)
   );
   if (elementFounded) {
    return elementFounded;
   } else {
    return null;
   }
  } catch (err) {
   throw new Error(`Error al buscar elementos por id. ${err}`);
  }
 }

 async createProduct(obj) {
  try {
   let objToSave;
   if (fs.existsSync(this.fileName)) {
    const file = await fs.promises.readFile(this.fileName, "utf-8");
    const fileParsed = JSON.parse(file);
    const lastElementId =
     fileParsed.length > 0 ? fileParsed[fileParsed?.length - 1].id : 1;
    objToSave = {
     ...obj,
     id: lastElementId + 1,
    };
    fileParsed.push(objToSave);
    await fs.promises.writeFile(
     this.fileName,
     JSON.stringify(fileParsed),
     "utf-8"
    );
   } else {
    objToSave = {
     ...obj,
     id: 1,
    };
    const array = [objToSave];
    await fs.promises.writeFile(this.fileName, JSON.stringify(array), "utf-8");
   }
   return objToSave;
  } catch (err) {
   throw new Error("Error al guardar un elemento", err);
  }
 }

 async deleteById(productId) {
  try {
   const file = await fs.promises.readFile(this.fileName, "utf-8");
   const elementToDelete = JSON.parse(file).find(
    (element) => element.id === parseInt(productId)
   );
   if (elementToDelete) {
    const elementsToSave = JSON.parse(file).filter(
     (element) => element.id !== parseInt(productId)
    );
    await fs.promises.writeFile(
     this.fileName,
     JSON.stringify(elementsToSave),
     "utf-8"
    );
   }
   return elementToDelete;
  } catch (err) {
   throw new Error("Error al eliminar un elemento por id ", err);
  }
 }

 async updateProductById(productId, productData) {
  try {
   const file = await fs.promises.readFile(this.fileName, "utf-8");
   const productsParsed = JSON.parse(file);
   const elementToUpdate = productsParsed.find(
    (element) => element.id === parseInt(productId)
   );
   let product = null;
   if (elementToUpdate) {
    product = {
     ...elementToUpdate,
     timestamp: Date.now(),
     nombre:
      productData?.nombre !== undefined
       ? productData.nombre
       : elementToUpdate.nombre,
     descripcion:
      productData?.descripcion !== undefined
       ? productData?.descripcion
       : elementToUpdate.descripcion,
     codigo:
      productData?.codigo !== undefined
       ? productData?.codigo
       : elementToUpdate.codigo,
     foto:
      productData?.foto !== undefined
       ? productData?.foto
       : elementToUpdate.foto,
     precio:
      productData?.precio !== undefined
       ? productData.precio
       : elementToUpdate.precio,
     stock:
      productData?.stock !== undefined
       ? productData?.stock
       : elementToUpdate.stock,
    };
    productsParsed[elementToUpdate.id] = product;
    await fs.promises.writeFile(
     this.fileName,
     JSON.stringify(productsParsed),
     "utf-8"
    );
    return product;
   }
  } catch (err) {
   throw new Error("Error al actualizar un elemento por id ", err);
  }
 }
};
