import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD7eZB_8cMa15R3CFQ7KsHeZ75d89uq8zA",
    authDomain: "smartmonitoringsystem-8e77c.firebaseapp.com",
    projectId: "smartmonitoringsystem-8e77c",
    storageBucket: "smartmonitoringsystem-8e77c.appspot.com",
    messagingSenderId: "969773040166",
    appId: "1:969773040166:web:e7490ce0a700447a571ce7",
    measurementId: "G-LRQNV59Z76"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

auth.onAuthStateChanged((user) => {
    console.log('Auth State Changed:', user ? 'User is signed in' : 'No user');
});

export { firestore, auth };