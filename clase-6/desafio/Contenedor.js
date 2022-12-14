const fs = require("fs");
module.exports = class Contenedor {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async save(obj) {
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
        await fs.promises.writeFile(
          this.fileName,
          JSON.stringify(array),
          "utf-8"
        );
      }
      console.log("Objeto guardado. Id asigndo: ", objToSave.id);
    } catch (err) {
      throw new Error("Error al guardar un elemento", err);
    }
  }

  async getById(numberId) {
    try {
      const file = await fs.promises.readFile(this.fileName, "utf-8");
      const elementFounded = JSON.parse(file).find(
        (element) => element.id === numberId
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

  async getAll() {
    try {
      const file = await fs.promises.readFile(this.fileName, "utf-8");
      return file;
    } catch (err) {
      throw new Error("Error al listar todos los elementos del archivo ", err);
    }
  }

  async deleteById(numberId) {
    try {
      const file = await fs.promises.readFile(this.fileName, "utf-8");
      //Busco el elemento en el archivo
      const elementToDelete = JSON.parse(file).find(
        (element) => element.id === numberId
      );
      if (elementToDelete) {
        //Si encuentra el elemento, filtra el archivo para obtener los que son diferentes al id solicitado
        const elementsToSave = JSON.parse(file).filter(
          (element) => element.id !== numberId
        );
        console.log("Elemento eliminado!");
        await fs.promises.writeFile(
          this.fileName,
          JSON.stringify(elementsToSave),
          "utf-8"
        );
      } else {
        console.log("No se encontr?? el elemento solicitado.");
      }
    } catch (err) {
      throw new Error("Error al eliminar un elemento por id ", err);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.fileName, JSON.stringify([]), "utf-8");
      console.log("Elementos eliminados con ??xito!");
    } catch (err) {
      throw new Error("Error al eliminar los elementos ", err);
    }
  }
}
