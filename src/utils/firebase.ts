
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUonVckqa7qs_4ssFTA9zV4LqY4Yff000",
  authDomain: "desi-panda-ced63.firebaseapp.com",
  projectId: "desi-panda-ced63",
  storageBucket: "desi-panda-ced63.firebasestorage.app",
  messagingSenderId: "65794702146",
  appId: "1:65794702146:web:162bf9ff37d309595966db",
  measurementId: "G-FZFK75FPRD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Record age verification
export const recordAgeVerification = async (user: User | null) => {
  if (!user) {
    console.log("No user is signed in");
    return null;
  }
  
  try {
    await setDoc(doc(db, "age_verification", user.uid), {
      accepted: true,
      acceptedAt: serverTimestamp(),
      termsVersion: "v1.0"
    });
    return true;
  } catch (error) {
    console.error("Error recording age verification:", error);
    return false;
  }
};

// Firebase authentication functions
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export { auth, db, app };
