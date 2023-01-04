const admin = require("firebase-admin");
const serviceAccount = require("./db/coderhouse-8d2f3-firebase-adminsdk-9f17i-3b0d7bdc76.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

CRUD();

async function CRUD() {
  const db = admin.firestore();
  const query = db.collection("usuarios");

  try {
    let id = 1;
    let doc = query.doc(`${id}`);
    await doc.create({ nombre: "Jose", dni: 12345678 });
    id++;
    doc = query.doc(`${id}`);
    await doc.create({ nombre: "Ana", dni: 12345567 });
    id++;
    doc = query.doc(`${id}`);
    await doc.create({ nombre: "Diego", dni: 12554878 });
    console.log("datos insertados");
  } catch (error) {
    console.log(error);
  }

  //Read ALL
  try{
    const querySnapshot = await query.get();
    let docs = querySnapshot.docs;

    const response = docs.map((doc) => ({
        id: doc.id,
        nombre: doc.data().nombre,
        din: doc.data().dni
    }));
    console.log(response);
  }catch(error){
    console.log(error)
  }

  //Read by ID
  try{
    let id = 2;
    const doc = query.doc(`${id}`);
    const item = await doc.get();
    const response = item.data();
    console.log(response);
  }catch(error){
    console.log(error)
  }

  //Update
  try{
    let id = 2;
    const doc = query.doc(`${id}`);
    const item = await doc.update({dni: 111222345});
    console.log("Item actualizado ", item);
  }catch(error){
    console.log(error)
  }

  //Delete
  try{
    let id = 2;
    const doc = query.doc(`${id}`);
    const item = await doc.delete();
    console.log("Item eliimnado ", item);
  }catch(error){
    console.log(error)
  }
}
