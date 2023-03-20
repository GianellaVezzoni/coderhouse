const {
  encryptPassword,
  comparePasswords,
} = require("../../../utils/encryptPassword");
const ContenedorMongoDb = require("../../../containers/mongo/ContenedorMongoDb");
const users = require("../models/user");

module.exports = class UserMongoController {
  constructor() {
    this.mongoDbConnection = new ContenedorMongoDb();
  }

  async createUser(user) {
    const objToSave = {
      ...user,
      password: encryptPassword(user.password),
    };
    const userCreated = await users.create({
      timestamp: Date.now(),
      ...objToSave,
    });
    return userCreated._id;
  }

  async loginUser(user) {
    const userData = await users.findOne({ email: user.email });
    if (comparePasswords(user.password, userData.password)) {
      return userData;
    }
    return null;
  }

  async disconnectConnection() {
    this.mongoDbConnection.disconnect();
  }
};
