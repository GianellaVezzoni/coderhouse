const fs = require("fs");

module.exports = class ProductContainer {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.fileName)) {
        console.log('en el if')
        const file = await fs.promises.readFile(this.fileName, "utf-8");
        return JSON.parse(file);
      } else {
        await fs.promises.writeFile(this.fileName, JSON.stringify([]), "utf-8");
        return [];
      }
    } catch (err) {
      return [];
    }
  }

  getProductsById(productId) {}
};
