const http = require("http");
const PORT = 2043;

const server = http.createServer((req, res) => {
  res.end(getMessage());
});

function getMessage() {
  const hora = new Date().getHours();

  if (hora >= 6 && hora <= 12) {
    return "Buenos dias!";
  }

  if (hora >= 13 && hora <= 19) {
    return "Buenas tardes!";
  }

  return "Buenas noches!";
}

const connectedServer = server.listen(PORT, () => {
  console.log(
    `El servidor esta corriendo en el puerto ${connectedServer.address().port}`
  );
});
