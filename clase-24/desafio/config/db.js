import dotenv from "dotenv";

export const options = {
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "ecommerce",
  },
};

export const optionsSqlite = {
  client: "sqlite3",
  connection: {
    filename: "./ecommerce.sqlite",
  },
  useNullAsDefault: true,
};

export const mongoUrl = `mongodb+srv://gianeAdmin:Sl17nI8KqXOjV6a3@desafio24.bmolsth.mongodb.net/?retryWrites=true&w=majority`;
