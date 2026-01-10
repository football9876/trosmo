import { initializeApp } from "firebase/app";
import {getFirestore,collection} from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
  // apiKey: import.meta.env.VITE_apiKey,
  // authDomain: import.meta.env.VITE_authDomain,
  // projectId: import.meta.env.VITE_projectId,
  // storageBucket: import.meta.env.VITE_storageBucket,
  // messagingSenderId: import.meta.env.VITE_messagingSenderId,
  // appId: import.meta.env.VITE_appId,
  // measurementId: import.meta.env.VITE_measurementId,
   apiKey: "AIzaSyAv9i_4p4pLsij_rlrBZ-12Rl0Hi3xRVvM",
  authDomain: "trimsotill.firebaseapp.com",
  projectId: "trimsotill",
  storageBucket: "trimsotill.firebasestorage.app",
  messagingSenderId: "561584153522",
  appId: "1:561584153522:web:499ae0bdcd0664178a3aab",
  measurementId: "G-E5Z5D9GBF7"
};
// Initialize Firebase Initialize Firebase
const app=initializeApp(firebaseConfig);

// Get a Firestore instance
const db = getFirestore(app);
const storage=getStorage(app);
const getCollectionProps:(collectionName:string)=>any=(collectionName:string)=>{
return collection(db,collectionName);
}

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {db,app,getCollectionProps,storage,auth, googleProvider};