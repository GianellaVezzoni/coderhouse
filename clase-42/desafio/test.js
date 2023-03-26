import MessageRepository from "./repo/messages.js";

const message = new MessageRepository();

await message.save({
  email: "vezzoni.00@gmail.com",
  name: "Gianella",
  lastname: "Vezzoni",
  age: 21,
  alias: "gv",
  avatar: "https://static.vecteezy.com/system/resources/previews/004/773/704/original/a-girl-s-face-with-a-beautiful-smile-a-female-avatar-for-a-website-and-social-network-vector.jpg",
  text: "Test",
  timestamp: "1679356156",
});
await message.save({
  email: "vezzoni2.00@gmail.com",
  name: "Gianella 2",
  lastname: "Vezzoni",
  age: 21,
  alias: "gv",
  avatar: "https://static.vecteezy.com/system/resources/previews/004/773/704/original/a-girl-s-face-with-a-beautiful-smile-a-female-avatar-for-a-website-and-social-network-vector.jpg",
  text: "Test",
  timestamp: "1679356156",
});

const repo = await message.getAll();
repo.map((message) => console.log("Datos del mensaje", message.getMessage()));
