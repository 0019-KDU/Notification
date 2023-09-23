// Import Firebase modules as ES modules
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhNHaL-JcSUqHrBZd28syW_qLSHFK-edY",
  authDomain: "lego-3fe7c.firebaseapp.com",
  projectId: "lego-3fe7c",
  storageBucket: "lego-3fe7c.appspot.com",
  messagingSenderId: "653230705538",
  appId: "1:653230705538:web:1c380451712cb5caa2dd9b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Function to fetch tokens from Firestore
async function fetchTokensFromFirestore() {
  const tokens = [];

  // Use the Firebase JavaScript SDK to fetch tokens from Firestore
  const db = firebase.firestore();
  const tokensCollection = db.collection("tokens");

  // Assuming you have a document in the 'tokens' collection that contains an array of tokens
  const tokensDocument = await tokensCollection.get();

  if (!tokensDocument.empty) {
    tokensDocument.forEach((doc) => {
      tokens.push(doc.id);
    });
  }

  return tokens;
}

// Rest of your code remains the same
// ...

// Initialize the form and handle submissions
document
  .getElementById("message-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const messageText = document.getElementById("message").value;
    const titleText = document.getElementById("title").value;

    fetchTokensFromFirestore().then((tokens) => {
      const message = {
        registration_ids: tokens,
        notification: {
          title: titleText,
          body: messageText,
        },
      };

      // The rest of your code for sending notifications
      // ...

      // Clear the form field
      document.getElementById("message").value = "";
    });
  });
