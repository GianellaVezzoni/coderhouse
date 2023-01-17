import MongoDbController from "./MongoDbController.js";
import sessionCollectionName from "./entities/session.js";

export default class SessionsController{
    constructor() {
        this.connection = new MongoDbController().connect();
       }

    async createSession(session){
        return await sessionCollectionName.create({session});
    }

    async getSessionById(session){
        const userFounded = await sessionCollectionName.find({userName: session});
        console.log(userFounded)
        if(userFounded.length > 0){
            return true
        }
        return false;
    }

    async deleteSession(session){
        return await sessionCollectionName.deleteOne({userName: session});
    }
}