import app from "firebase/app";
import "firebase/auth";


// Paste the firebaseConfig here
const firebaseConfig = {
  apiKey: "AIzaSyDHha0h6ik1RmlL2DpCp6s2DDhkx4K-Z6k",
  authDomain: "can-do-coop.firebaseapp.com",
  databaseURL: "https://can-do-coop-default-rtdb.firebaseio.com",
  projectId: "can-do-coop",
  storageBucket: "can-do-coop.appspot.com",
  messagingSenderId: "487317813419",
  appId: "1:487317813419:web:878b17857a34b1aa7f5fee",

};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  doGetIdToken = (bool) => {
    return this.auth.currentUser.getIdToken(/* forceRefresh */ bool);
  };

  doGetUserByEmail = (email) => this.auth.getUserByEmail(email);
}

export default Firebase;
