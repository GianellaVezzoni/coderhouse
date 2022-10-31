const fs = require("fs");
class Contenedor {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async save(obj) {
    //Recibe un obj, lo guarda en el archivo y devuelve el id asignado
    // Los ids no pueden estar repetidos
    try {
        let objToSave;
      if (fs.existsSync(this.fileName)) {
        const file = await fs.promises.readFile(this.fileName, "utf-8");
        const fileParsed = JSON.parse(file);
        const lastElementId = fileParsed[fileParsed.length - 1].id;
        objToSave = {
          ...obj,
          id: lastElementId + 1,
        };
        const elements = fileParsed.push(objToSave);
        console.log("el array ", elements)
        await fs.promises.appendFile(
          this.fileName,
          JSON.stringify(elements)
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
      console.log("Objeto guardado. Id asigndo: ", objToSave.id)
    } catch (err) {
      console.log("en el catch ", err);
    }
  }

  getById(number) {
    // Recibe un id y devuelve todo el obj de ese id o null si este no está
  }

  getAll() {
    //Debe devolver el array con los objetos del archivo
  }

  deleteById() {
    //Debe eliminar del archivo el obj con el id buscado
  }

  deleteAll() {
    // Elimina todos los obj del archivo
  }
}
const obj = {
  title: "Lapices",
  price: 200,
  thumbnail:
    "https://economiaparatodos.net/wp-content/uploads/LAPIZ-e1372204441533.jpg",
};
const containerObj = new Contenedor("productos.txt");
containerObj.save(obj);
