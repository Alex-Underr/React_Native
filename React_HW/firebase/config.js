import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAB1U9k1pIkIN6em74WKB4tdb0HSn116v0",
  authDomain: "react-native-hw-3768a.firebaseapp.com",
  projectId: "react-native-hw-3768a",
  storageBucket: "react-native-hw-3768a.appspot.com",
  messagingSenderId: "606593049465",
  appId: "1:606593049465:web:32f18029012bf78c1ec5a8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
