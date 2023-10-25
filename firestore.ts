// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import 'firebase/firestore';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
   apiKey: 'AIzaSyBR2gPk2DtiOFxMBpx-SDSVCngx8tfN6DI',
    authDomain: 'ftl-react.firebaseapp.com',
    projectId: 'ftl-react',
    storageBucket: 'ftl-react.appspot.com',
    messagingSenderId: '230545093782',
    appId: '1:230545093782:web:6cb380cf91cc7615acfeb7',
    measurementId: 'G-5XCK47Z6PK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Get a list of cities from your database
export async function getUsers(firestore) {
  const usersCol = collection(firestore, 'users');
  const usersSnapshot = await getDocs(usersCol);
  const userList = usersSnapshot.docs.map(doc => doc.data());
  return userList;
}

export default firestore;
