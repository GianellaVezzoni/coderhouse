const firebaseAdmin = require("firebase-admin");
const { firebase } = require("../../config/index");

class FirebaseController {
 async connect() {
  firebaseAdmin.initializeApp({
   credential: firebaseAdmin.credential.cert(firebase),
  });
 }
}

module.exports = FirebaseController;
