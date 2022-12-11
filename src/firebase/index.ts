import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
      apiKey: 'AIzaSyDf2I7hhzHtcxUQEZJ6o-KGDrTx9NUiFNI',
      authDomain: 'vcpmc---intermediate.firebaseapp.com',
      projectId: 'vcpmc---intermediate',
      storageBucket: 'vcpmc---intermediate.appspot.com',
      messagingSenderId: '237468972897',
      appId: '1:237468972897:web:62e8d798a6fe9ca8b9b720',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
