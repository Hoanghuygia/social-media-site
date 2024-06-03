import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "my-social-72c2f.firebaseapp.com",
  projectId: "my-social-72c2f",
  storageBucket: "my-social-72c2f.appspot.com",
  messagingSenderId: "990835287133",
  appId: "1:990835287133:web:c5a1aef407c579aaaf59b4"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage()