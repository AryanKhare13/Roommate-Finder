// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics, logEvent } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyCISvHfKmY6TwEReUYTT3invxN73Wq6lQQ",
//     authDomain: "roommate-finder-c1aa3.firebaseapp.com",
//     projectId: "roommate-finder-c1aa3",
//     storageBucket: "roommate-finder-c1aa3.appspot.com",
//     messagingSenderId: "325754318317",
//     appId: "1:325754318317:web:ac74db3258422352388be4",
//     measurementId: "G-QL7QK7315W"
// };

// // Initialize Firebase
// initializeApp(firebaseConfig);

// const analytics = getAnalytics();
// logEvent(analytics, "notification_received");


// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBA4_PqtJXEaUBIFYCp1NKxMRfCwm7wtGE',
    authDomain: 'roommate-finder-test.firebaseapp.com',
    projectId: 'roommate-finder-test',
    storageBucket: 'roommate-finder-test.appspot.com',
    messagingSenderId: '777280599867',
    appId: '1:777280599867:web:c58f17fd9eedea514a291e',
    measurementId: 'G-8NMPPDZ79M',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
logEvent(analytics, 'notification_received');
