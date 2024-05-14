// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD16wJXppwisYYxKJuapfpucvHRHGTiKBg",
    authDomain: "imagel-c2e7a.firebaseapp.com",
    databaseURL: "https://imagel-c2e7a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "imagel-c2e7a",
    storageBucket: "imagel-c2e7a.appspot.com",
    messagingSenderId: "612675533224",
    appId: "1:612675533224:web:18b21ed69094b3396d859d"
  };
/// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize database
const db = firebase.database();

// Get user's data
let username = prompt("Please tell us your name");

// Check if username is "secret" to make the user an admin
let isAdmin = false;
if (username.toLowerCase() === "secret") {
    username = "Admin";
    isAdmin = true;
    document.body.classList.add("admin"); // Add admin class to body for styling
}

// Submit form
document.getElementById("message-form").addEventListener("submit", sendMessage);

// Send message to database
function sendMessage(e) {
    e.preventDefault();

    // Get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;

    // Clear the input box
    messageInput.value = "";

    // Auto scroll to bottom
    document.getElementById("messages").scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

    // Create database collection and send in the data
    db.ref("messages/" + timestamp).set({
        username,
        message,
    });
}

// Display the messages
// Reference the collection created earlier
const fetchChat = db.ref("messages/");

// Check for new messages using the onChildAdded event listener
fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${isAdmin ? "admin" : username === messages.username ? "sent" : "receive"}><span>${messages.username === "Admin" ? "<span class='rainbow'>" + messages.username + "</span>" : messages.username}: </span>${messages.message}</li>`;
    // Append the message on the page
    document.getElementById("messages").innerHTML += message;
});