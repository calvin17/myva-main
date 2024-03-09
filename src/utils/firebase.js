// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBsnY0lA7ijHYTpecjOLnedkT_bnWcCUuE',
  authDomain: 'myva-data.firebaseapp.com',
  projectId: 'myva-data',
  storageBucket: 'myva-data.appspot.com',
  messagingSenderId: '925231215553',
  appId: '1:925231215553:web:7c26fb027679e0621cf540',
  measurementId: 'G-3DZHSN8GYM',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
