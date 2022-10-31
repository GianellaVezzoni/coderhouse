//Manejo de archivos

/*
Funciones asincronicas

readFileSync = Leer un archivo
writeFileSync = Escribir un archivo
appendFileSync = Actualizar un archivo
unlinkSync = Eliminar un archivo
mkdirSync = Crear una carpeta
*/

const fs = require("fs");

const data = fs.readFileSync("./test-input-sync.txt", "utf-8");
//El primer parametro es un string con la ruta del archivo que vamos a leer
//El segundo parametro indica el formato de codificacion

//------------ Sobreescribir un archivo ------------
fs.writeFileSync("./test-input-sync.txt", "Probando creacion de archivo");
//El primer parametro es un string con la ruta del archivo
// El segundo parametro es lo que queremos escribir
//La funcion admite un tercer parametro que es opcional, que es el formato de codificacion. Ej utf-8

//------------ Agregar contenidos a un archivo ---------
fs.appendFileSync("./test-input-sync.txt", "Texto que agrego");
// Primer parametro es un string con la ruta del archivo al que le queremos agregar el contenido
// El segundo parametro indica lo que queremos agregar
//La funcion admite un tercer parametro que es opcional, que es el formato de codificacion. Ej utf-8

//------------ Borrar un archivo ---------
fs.unlinkSync("./test-input-sync.txt");
//Unico parametro, es un string con la ruta del archivo que queremos borrar

// FS con callbacks
fs.readFile("/ruta/archivo", "utf-8", (error, resp) => {
  if (error) {
  } else {
    console.log(resp);
  }
});
// Recibe los mismos parametros que en la version sincronica, mas el callback

//Sobreescribir
fs.writeFile("/ruta/archivo", "utf-8", (error, resp) => {
  if (error) {
  } else {
    console.log(resp);
  }
});

//agregar
fs.appendFile("/ruta/archivo", "Texto que agrego", (error) => {
  if (error) {
  } else {
    console.log("Guardado!");
  }
});

//borrar
fs.appendFile("/ruta/archivo", (error) => {
  if (error) {
  } else {
    console.log("Borrado!");
  }
});

//crear una carpeta
fs.mkdir("/ruta/archivo", (error) => {
  if (error) {
  } else {
    console.log("Carpeta creada!");
  }
});

//Leer contenido de una carpeta
fs.mkdir("/ruta/archivo", (error, nombres) => {
  if (error) {
  } else {
    console.log(nombres);
  }
});

//------------ Via promesas ------------
function leer() {
  fs.promises
    .readFile("./archivo", "utf-8")
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}
leer();

async function leer2() {
  try {
    const contenido = await fs.promises.readFile("./archivo", "utf-8");
    console.log(contenido);
  } catch (err) {
    console.log("Error de lectura ", err);
  }
}
leer2();

async function escribir() {
  try {
    const contenido = await fs.promises.writeFile("./archivo", "Texto");
    console.log(contenido);
  } catch (err) {
    console.log("Error de escritura ", err);
  }
}
escribir();

async function agregar() {
  try {
    const contenido = await fs.promises.appendFile("./archivo", "Texto nuevo");
    console.log(contenido);
  } catch (err) {
    console.log("Error de append ", err);
  }
}
agregar();

async function renombrar() {
  try {
    const contenido = await fs.promises.rename(
      "./archivo",
      "./archivoNuevoNombre"
    );
    console.log(contenido);
  } catch (err) {
    console.log("Error al cambiar los nombres ", err);
  }
}
renombrar();
