import "dotenv/config";
import * as firebase from "firebase-admin";

if (!firebase.apps.length) {
  firebase.initializeApp({
    credential: firebase.credential.cert({
      projectId: process.env.PROJECT_ID,
      privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
      clientEmail: process.env.CLIENT_EMAIL,
    }),
    databaseURL: "https://fanzy-minigames-default-rtdb.europe-west1.firebasedatabase.app",
  });
} else {
  firebase.app(); // if already initialized, use that one
}

export default firebase.firestore();
