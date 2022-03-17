import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 👇 この一行をコメントアウトする
import firebaseConfig from "@/firebaseConfig";

// 👇 コメントアウトを外して、自分のfirebaseプロジェクトの構成オブジェクトを貼り付ける
// const firebaseConfig = {
//   apiKey: "AIzaS...",
//   ...
// }

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
