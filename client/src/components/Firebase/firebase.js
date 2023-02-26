import app from 'firebase/app';
import 'firebase/auth';

// Paste the firebaseConfig here 
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAn7LTdLHyQld9lRyE2dLGyuBZ5Jyj_NLw",
  authDomain: "lablets-dd64e.firebaseapp.com",
  databaseURL: "https://lablets-dd64e-default-rtdb.firebaseio.com",
  projectId: "lablets-dd64e",
  storageBucket: "lablets-dd64e.appspot.com",
  messagingSenderId: "899950494322",
  appId: "1:899950494322:web:3c2ca80720a932d5a638eb",
  measurementId: "G-S5DGYS017L"
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

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  doGetIdToken = (bool) => {
    return this.auth.currentUser.getIdToken(/* forceRefresh */ bool);
  }

  doGetUserByEmail = email => this.auth.getUserByEmail(email);

}

export default Firebase;