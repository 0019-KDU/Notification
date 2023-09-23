const serverKey = "feIQ7iPETc6XRIahlvzM8C:APA91bGmqrtgUSsdZvOMk97K32QJRizAgFVcKYCjyahPHewSDdHjrDZgOYLGdSVXtuINgHVBPu2WLaCzAFS0-DlhlalH6br5aGQO0GCLEiAvaoLVYYN8MiXWqZcrjfJpr1wAGuEAJ34A";
const fcmEndpoint = "https://fcm.googleapis.com/fcm/send";

document
  .getElementById("message-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting traditionally

    const recipient = document.getElementById("recipient").value;
    const messageText = document.getElementById("message").value;

    const message = {
      to: recipient,
      notification: {
        title: "Notification Title",
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

    // Clear the form fields
    document.getElementById("recipient").value = "";
    document.getElementById("message").value = "";
  });
