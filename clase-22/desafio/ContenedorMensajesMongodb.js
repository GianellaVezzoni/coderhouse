const MongoDbController = require("./controllers/MongoDbController");
const messageCollectionName = require("./entities/message");

class ContenedorMensajesMongodb {
  constructor() {
    this.connection = new MongoDbController().connect();
  }

  async getMessages() {
    return await messageCollectionName.find();
  }

  async createMessage(messageData) {
    const message = {
      ...messageData,
      timestamp: Date.now(),
    };
    return await messageCollectionName.create(message);
  }
}

module.exports = ContenedorMensajesMongodb;
