const mongoose = require("mongoose");
const {mongo_url} = require("../../config/index");

module.exports = class ContenedorMongoDb {
    constructor() {
        this.connect();
    }

    async connect() {
        mongoose.set('strictQuery', true);
        mongoose.connect(mongo_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

    async disconnect(){
        mongoose.disconnect();
    }

}