import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDtiwn0pZ4UcQaXxA5GAmlPks9PAkqf1z4",
  authDomain: "cis371-b3d61.firebaseapp.com",
  projectId: "cis371-b3d61",
  storageBucket: "cis371-b3d61.firebasestorage.app",
  messagingSenderId: "72623196536",
  appId: "1:72623196536:web:69e48dd1f2d08920cba08d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
