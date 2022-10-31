const fs = require("fs");

fs.readFile("./package.json", "utf-8", (error, resp) => {
  if (error) {
    throw new Error("Hubo un error en la lectura ", err);
  } else {
    const info = {
      contenidoStr: resp,
      contenidoObj: JSON.parse(resp),
      size: resp.length,
    };
    console.log("info ", info);
    fs.writeFile(
      "./info.txt",
      JSON.stringify(info, null, 2),
      "utf-8",
      (err) => {
        if (err) {
          throw new Error("Hubo un error al crear el archivo ", err);
        }
        console.log("La escritura fue exitosa!")
      }
    );
  }
});
