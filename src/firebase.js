// import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDeAjMFnAzBRksQi2AKi-BSBW-qns3y-8Q",
  authDomain: "health-insurance-9f08f.firebaseapp.com",
  projectId: "health-insurance-9f08f",
  storageBucket: "health-insurance-9f08f.appspot.com",
  messagingSenderId: "410205073788",
  appId: "1:410205073788:web:f81fb029c1bbd0b86df4f9",
  measurementId: "G-XJJXPYQNTK",
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };
// export default firebase;
