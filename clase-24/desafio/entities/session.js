import mongoose from "mongoose";

const sessionCollectionName = "sessions";

const sessionSchema = new mongoose.Schema({
    userName: {type: String, require: true}
});

export default mongoose.model(sessionCollectionName, sessionSchema);