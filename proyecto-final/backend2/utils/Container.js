import fs from "fs";

class Container {
  nextId;
  dataArray = new Array();

  constructor(fileName) {
    this.fileName = fileName;
    if (fs.existsSync(fileName)) {
      this.dataArray = JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
      this.nextId = this.getNextId();
    } else {
      this.nextId = 0;
      fs.writeFileSync(this.fileName, JSON.stringify(this.dataArray));
    }
  }

  async save(object) {
    try {
      object["id"] = this.nextId;
      this.dataArray.push(object);
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(this.dataArray)
      );
      this.nextId++;
      return Promise.resolve(object.id);
    } catch (err) {
      return null;
    }
  }

  getById(id) {
    let obj = null;
    this.dataArray.map((element) => {
      if (element.id == id) {
        obj = element;
      }
    });
    return obj;
  }

  async update(id, newObject) {
    let index = this.#IdExists(id);
    if (index) {
      this.dataArray[index] = { ...newObject, id: Number(id) };
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(this.dataArray)
      );
      return Promise.resolve(id);
    } else {
      return Promise.reject();
    }
  }

  IdExists(id) {
    let response = false;
    this.dataArray.forEach((element, index) => {
      if (element.id == id) {
        response = index;
      }
    });
    return response;
  }

  getNextId() {
    if (this.dataArray.length > 0) {
      let maxId = this.dataArray.reduce((acc, current) => {
        return Math.max(acc, current.id);
      }, 0);
      return maxId + 1;
    } else {
      return 0;
    }
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.fileName, "utf-8");
      this.dataArray = JSON.parse(data);
      return this.dataArray;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteById(id) {
    let flag = false;
    for (let i = 0; i < this.dataArray.length; i++) {
      if (this.dataArray[i].id == id) {
        flag = true;
        this.dataArray.splice(i, 1);
        i--;
      }
    }
    if (flag) {
      try {
        await fs.promises.writeFile(
          this.fileName,
          JSON.stringify(this.dataArray)
        );
        console.log("borro");
        return id;
      } catch (err) {
        console.log(err);
      }
    } else {
      return null;
    }
  }

  async deleteAll() {
    this.dataArray = [];
    try {
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(this.dataArray)
      );
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

export default Container;
