import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDYZ1n78t1AFmg5hjRCIK_loty0_k_-r20",
  authDomain: "reactchat-8a6ae.firebaseapp.com",
  projectId: "reactchat-8a6ae",
  storageBucket: "reactchat-8a6ae.appspot.com",
  messagingSenderId: "1093946287808",
  appId: "1:1093946287808:web:91b1b7050c221aa7f92f25"
};
const app = initializeApp(firebaseConfig);

export const auth =getAuth()
export const db =getFirestore()
export const storage= getStorage()