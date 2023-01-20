import MongoDbController from "./MongoDbController.js";
import sessionCollectionName from "./entities/session.js";
import { encryptPassword } from "./utils/encryptPassword.js";

export default class SessionsController{
    constructor() {
        this.connection = new MongoDbController().connect();
       }

    async createUser(session){
        const user = {
            ...session,
            createdAt: new Date(),
            userPassword: encryptPassword(session.userPassword)
        }
        const userFounded = await sessionCollectionName.find({userEmail: session.userEmail})
        if(userFounded.length > 0){
            return null;
        }
        return await sessionCollectionName.create({user});
    }

    async getSessionById(session){
        const userFounded = await sessionCollectionName.find({userName: session});
        if(userFounded.length > 0){
            return true
        }
        return false;
    }

    async deleteSession(session){
        return await sessionCollectionName.deleteOne({userName: session});
    }
}