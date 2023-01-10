import { normalize, schema } from "normalizr";
const { existsSync, readFileSync, writeFile } = require("fs");

module.exports = class ContenedorMensajesNormalized {
 constructor(fileName) {
  this.fileName = fileName;
  if (!existsSync(fileName)) {
   writeFile(this.fileName, JSON.stringify([]));
  }
 }

 async save(message) {
  try {
   const fileDataParsed = JSON.parse(readFileSync(this.fileName));
   const lastItemId = fileDataParsed[fileDataParsed.length - 1].id;
   const messageAdapted = {
    ...message,
    id: lastItemId,
   };
   await promises.writeFile(this.fileName, JSON.stringify(messageAdapted));
   return true;
  } catch (err) {
   return null;
  }
 }

 async getAllMessages() {
  try {
   const data = readFileSync(this.fileName, "utf-8");
   this.dataToNormalize = {
    id: "1",
    messages: JSON.parse(data),
   };
   this.authorSchema = new schema.Entity(
    "author",
    {},
    { idAttribute: "email" }
   );
   this.messageSchema = new schema.Entity("message", {
    author: this.authorSchema,
   });
   this.messagesSchema = new schema.Entity("messages", {
    messages: [this.messageSchema],
   });
   return normalize(this.dataToNormalize, this.messagesSchema);
  } catch (err) {
   return null;
  }
 }
};
