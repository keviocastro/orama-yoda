import firebase from 'firebase';
import 'firebase/firestore';
import { FIREBASE_CREDENTIALS } from './env';

export default !firebase.apps.length
    ? firebase.initializeApp(FIREBASE_CREDENTIALS) :
    firebase.app();
