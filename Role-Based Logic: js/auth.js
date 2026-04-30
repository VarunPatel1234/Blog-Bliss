// Firebase Configuration (Get this from your Firebase Console)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// Login Logic
document.getElementById('login-btn').onclick = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
};

// Check Auth State & Roles
auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('login-btn').innerText = "Logout";
        
        // Check "users" collection in Firestore for role
        db.collection('users').doc(user.uid).get().then(doc => {
            if (doc.exists && doc.data().role === 'admin') {
                document.getElementById('admin-link').style.display = 'inline';
            }
        });
    } else {
        document.getElementById('login-btn').innerText = "Login";
        document.getElementById('admin-link').style.display = 'none';
    }
});
