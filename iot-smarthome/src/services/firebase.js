import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { 
  getAuth, 
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  EmailAuthProvider,
  PhoneAuthProvider,
  signInWithPopup
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');
const phoneProvider = new PhoneAuthProvider(auth);

googleProvider.setCustomParameters({ prompt: 'select_account' });
facebookProvider.setCustomParameters({ display: 'popup', auth_type: 'reauthenticate' });
microsoftProvider.setCustomParameters({ prompt: 'select_account', tenant: 'common' });

auth.onAuthStateChanged((user) => {
    console.log('Auth State Changed:', user ? 'User is signed in' : 'No user');
});

export const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const credential = FacebookAuthProvider.credentialFromResult(result);
    return { user: result.user, credential };
  } catch (error) {
    throw error;
  }
};

export const signInWithMicrosoft = async () => {
  try {
    const result = await signInWithPopup(auth, microsoftProvider);
    const credential = OAuthProvider.credentialFromResult(result);
    return { user: result.user, credential };
  } catch (error) {
    throw error;
  }
};

export { 
  firestore, 
  auth, 
  googleProvider,
  facebookProvider,
  microsoftProvider,
  phoneProvider,
  EmailAuthProvider
};