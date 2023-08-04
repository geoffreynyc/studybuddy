import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCRX195bH4bYghvICXG92xdNoFunO7RS3U",
  authDomain: "studybuddy-a3713.firebaseapp.com",
  projectId: "studybuddy-a3713",
  storageBucket: "studybuddy-a3713.appspot.com",
  messagingSenderId: "829437088250",
  appId: "1:829437088250:web:6624da659017c9d3e3d443",
  measurementId: "G-QLJV7W03G6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;
