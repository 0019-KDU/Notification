const serverKey =
  "AAAAmBeVi4I:APA91bFHzBZI544BqTpZYgU-Fn8wztYJvgSJXWlA0R4zpOy4gZ22ndhZsyltBam-1zZu_VpyjdMtZnQKD0AcOlNL0-FCNdWQaCFF2hITkTSwppm5mP5207Ehv_vERNr9dfIf_PHfgI0v";
const fcmEndpoint = "https://fcm.googleapis.com/fcm/send";

document
  .getElementById("message-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting traditionally

    const messageText = document.getElementById("message").value;
    const titleText = document.getElementById("title").value;

    // Fetch tokens from Firestore and append them to registration_ids
    fetchTokensFromFirestore().then((tokens) => {
      const message = {
        registration_ids: tokens, // Use 'registration_ids' for multiple tokens
        notification: {
          title: titleText,
          body: messageText,
        },
      };

      fetch(fcmEndpoint, {
        method: "POST",
        headers: {
          Authorization: `key=${serverKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to send notification.");
          }
          console.log("Notification sent successfully.");
        })
        .catch((error) => {
          console.error("Error sending notification:", error);
        });
    });

    // Clear the form field
    document.getElementById("message").value = "";
  });

async function fetchTokensFromFirestore() {
  const tokens = [];

  // Initialize Firebase with your config
  const firebaseConfig = {
    apiKey: "AIzaSyAhNHaL-JcSUqHrBZd28syW_qLSHFK-edY",
    authDomain: "lego-3fe7c.firebaseapp.com",
    projectId: "lego-3fe7c",
    storageBucket: "lego-3fe7c.appspot.com",
    messagingSenderId: "653230705538",
    appId: "1:653230705538:web:db66e4e2f206d1f5a2dd9b",
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const db = firebase.firestore();
  const tokensCollection = db.collection("tokens");

  // Assuming you have a document in the 'tokens' collection that contains an array of tokens
  const tokensDocument = await tokensCollection.doc("your_document_id").get();

  if (tokensDocument.exists) {
    const tokenData = tokensDocument.data();
    if (tokenData && tokenData.tokens) {
      tokens.push(...tokenData.tokens);
    }
  }

  return tokens;
}
