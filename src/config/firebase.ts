import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVBsmh2BHDkYZSlS6SSxMQ7NNRVJry58I",
  authDomain: "problinx-app.firebaseapp.com",
  projectId: "problinx-app",
  storageBucket: "problinx-app.firebasestorage.app",
  messagingSenderId: "52502049403",
  appId: "1:52502049403:web:9e153bca45cc1cbf2768de",
  measurementId: "G-YEJWRGRNZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Analytics and get a reference to the service
export const analytics = getAnalytics(app);

// Auth providers
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// Configure Google provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Configure Facebook provider
facebookProvider.setCustomParameters({
  display: 'popup'
});

export default app; 