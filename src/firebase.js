import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9W8F58WkJPD6mtldN22gEmBILJuXuexg",
  authDomain: "navnath-temple.firebaseapp.com",
  databaseURL: "https://navnath-temple-default-rtdb.firebaseio.com",
  projectId: "navnath-temple",
  storageBucket: "navnath-temple.firebasestorage.app", // ✅ FIXED
  messagingSenderId: "833675577665",
  appId: "1:833675577665:web:39655162c647f71d12f9c0"
};

// ✅ Prevent duplicate app
const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApps()[0];

// ✅ Export everything from ONE place
export const database = getDatabase(app);
export const storage = getStorage(app);
export const auth = getAuth(app);