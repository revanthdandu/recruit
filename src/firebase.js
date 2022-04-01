import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYDYqUpgwtVlG3H1xedBiPBEtUMo1B6FU",
  authDomain: "recruit-411e2.firebaseapp.com",
  projectId: "recruit-411e2",
  storageBucket: "recruit-411e2.appspot.com",
  messagingSenderId: "580745407411",
  appId: "1:580745407411:web:49ff78b785d030d95039c6",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
