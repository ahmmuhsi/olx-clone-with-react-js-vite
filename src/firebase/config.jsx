
import { initializeApp } from 'firebase/app'
import { getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC4afUOxZVu7mMwzfHtSfu0DXeopyLcU4k",
  authDomain: "olx-clone-19576.firebaseapp.com",
  projectId: "olx-clone-19576",
  storageBucket: "olx-clone-19576.firebasestorage.app",
  messagingSenderId: "63834244100",
  appId: "1:63834244100:web:1ae37a4f2bf13cd4042151",
  measurementId: "G-JEVKRV90GL"
};

const app = initializeApp(firebaseConfig)

const FirebaseApp = {
  app,
  auth: getAuth(app),
  firestore: getFirestore(app),
  storage: getStorage(app)
}

 export const auth= getAuth(app);
export default FirebaseApp







