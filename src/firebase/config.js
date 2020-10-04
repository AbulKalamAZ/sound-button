import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore';
import 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: 'AIzaSyCGpoCIcR_3hBnD_K6PL90HBdvUSRbHxIE',
    authDomain: 'sound-button-creator.firebaseapp.com',
    databaseURL: 'https://sound-button-creator.firebaseio.com',
    projectId: 'sound-button-creator',
    storageBucket: 'sound-button-creator.appspot.com',
    messagingSenderId: '107305958050',
    appId: '1:107305958050:web:e3f175bfa105200c0f75fb',
    measurementId: 'G-68FRDWVQCJ',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
