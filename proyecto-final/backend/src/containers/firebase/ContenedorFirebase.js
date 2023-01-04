const admin = require("firebase-admin");
const serviceAccount = require("./db/coderhouse-8d2f3-firebase-adminsdk-9f17i-3b0d7bdc76.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

