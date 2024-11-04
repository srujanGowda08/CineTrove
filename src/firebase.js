import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8NdUSd-vnt1D5DP94tu7WI4XTRP6ft_0",
  authDomain: "cinetrove-c633e.firebaseapp.com",
  projectId: "cinetrove-c633e",
  storageBucket: "cinetrove-c633e.firebasestorage.app",
  messagingSenderId: "941797560457",
  appId: "1:941797560457:web:822d845a08772b14a73658",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Error creating user:", error);
    alert(error);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error logging in:", error);
    alert(error);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, login, signup, logout };
