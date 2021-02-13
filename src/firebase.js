import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqbczqAtYurFd9mhjjpkmpddL3pWt1OOk",
  authDomain: "flickstr-3a520.firebaseapp.com",
  projectId: "flickstr-3a520",
  storageBucket: "flickstr-3a520.appspot.com",
  messagingSenderId: "706156086634",
  appId: "1:706156086634:web:cf1a3943d29264fd725113",
};
const app = firebase.initializeApp(firebaseConfig);

export const googleOAuth = () => new firebase.auth.GoogleAuthProvider();
export const fbOAuth = () => new firebase.auth.FacebookAuthProvider();

export default app;
