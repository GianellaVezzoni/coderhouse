const firebaseAdmin = require("firebase-admin");
const { firebase } = require("../../config/index");

class FirebaseController {
 constructor() {}

 async connect(dataName) {
  firebaseAdmin.initializeApp({
   credential: firebaseAdmin.credential.cert(firebase),
   databaseURL: dataName
  });
 }
}

module.exports = FirebaseController;
