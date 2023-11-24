// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import {getFirestore, collection} from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// import {FIREBASE_KEY} from '@env';
// import config from '../envConfig'
// import {FIREBASE_KEY} from '@env'
// import {FIREBASE_KEY} from 'react-native-dotenv';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `AIzaSyDY7obvRhSANTgI_rNlhjThOmWGVC5AkLc`,
  authDomain: 'react-native-5b59e.firebaseapp.com',
  projectId: 'react-native-5b59e',
  storageBucket: 'react-native-5b59e.appspot.com',
  messagingSenderId: '467226361642',
  appId: '1:467226361642:web:e79340ce1b7a7ca3712853',
  measurementId: 'G-ZD099EPZL9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const fundTypesRef = collection(db, 'fundTypes');
export const fundsRef = collection(db, 'funds');

export default app;
