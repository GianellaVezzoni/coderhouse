const fs = require("fs");

fs.promises
  .readFile("./info.txt", "utf-8")
  .then((data) => {
    const info = JSON.parse(data);
    console.log(info);
    info.author = "Coderhouse";
    fs.promises.writeFile(
      "./package.json.coder",
      JSON.stringify(info, null, 2)
    ).then(()=> console.log("Escritura exitosa"))
    .catch(err => console.log('Error al crear el archivo nuevo ', err))
  })
  .catch((err) => console.log("hubo un error en la lectura", err));
