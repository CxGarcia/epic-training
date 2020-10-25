import firebase from "firebase/app";
import "firebase/firestore";
// import "firebase/storage";

const config = {
  apiKey: "AIzaSyBLxStNthQUZuXTh_Ouu0un_wgs3_UgsaE",
  authDomain: "epic-bf1ed.firebaseapp.com",
  databaseURL: "https://epic-bf1ed.firebaseio.com",
  projectId: "epic-bf1ed",
  storageBucket: "epic-bf1ed.appspot.com",
  messagingSenderId: "862976558904",
  appId: "1:862976558904:web:e6bdbff72a3a94635363cd",
};

firebase.initializeApp(config);

//Exports and helper funcs
// export default firebase;
const db = firebase.firestore();

function addCollection(collection, data) {
  return db.collection(collection).add(data);
}

function collectIdsAndDocs(doc) {
  return { id: doc.id, ...doc.data() };
}

async function deleteById(collection, id) {
  await db.doc(`${collection}/${id}`).delete();
}

async function editById(collection, id, updateObj) {
  await db.doc(`${collection}/${id}`).update(updateObj);
}

async function getCollection(collection) {
  const dbCollection = await db.collection(collection).get();
  const dbArr = dbCollection.docs.map(collectIdsAndDocs);

  return dbArr;
}

export {
  db,
  addCollection,
  collectIdsAndDocs,
  deleteById,
  editById,
  getCollection,
};

// //TODO
// export function generateId(collection) {
//   const generator = db.collection(collection).doc();

//   return generator.nd.clientId;
// }

// //TODO
// export async function getSnapshot(collection) {
//   const db = firebase.firestore();
//   let dbArr;

//   const dbCollection = await db
//     .collection(collection)
//     .onSnapshot((snapshot) => {
//       snapshot.docChanges().map((change) => {});
//     });
// }

// function putFiles(file, collection, id, name) {
//   return storage
//     .ref()
//     .child(collection)
//     .child(id)
//     .child(name)
//     .put(file)
//     .then((res) => res.ref.getDownloadURL())
//     .catch((error) => {
//       console.log("Upload Failed:", error.message);
//     });
// }
