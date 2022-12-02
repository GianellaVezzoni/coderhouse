const express = require("express");
const routes = require("./routes");
const app = express();
const PORT = 8080 || process.env.PORT;

app.use("/api/", routes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
