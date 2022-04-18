import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBrw8wdycydjga6VWFpFvy2VOlh1hqMugA",
  authDomain: "fanzy-minigames.firebaseapp.com",
  databaseURL: "https://fanzy-minigames-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fanzy-minigames",
  storageBucket: "fanzy-minigames.appspot.com",
  messagingSenderId: "211977488068",
  appId: "1:211977488068:web:1a6fde8d59b93f8eff2b91",
  measurementId: "G-T8MTE7QS0W",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Auth exports
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Firestore exports
export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment;
export const FireBaseTimeStamp = firebase.firestore.Timestamp;

// Storage exports
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

// Helper functions
export const getUserWithUsername = async (username: string) => {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("username", "==", username).limit(1);
  return (await query.get()).docs[0];
};

export function docToJSON(doc: any) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
