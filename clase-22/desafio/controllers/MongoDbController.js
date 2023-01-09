const mongoose = require('mongoose');
const {mongo_url} = require('../config/mongo');
 
class MongoDbController {
    async connect(){
        await mongoose.connect(mongo_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }).then(() => console.log('mongoose connected!'))
    }

    async disconnect(){
        mongoose.disconnect();
    }
}

module.exports = MongoDbController;