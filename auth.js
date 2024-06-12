// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAl8z4hqQ1Y2UmaznuJGHzov0hHzKZMKqo",
  authDomain: "olx-clone-j1.firebaseapp.com",
  projectId: "olx-clone-j1",
  storageBucket: "olx-clone-j1.appspot.com",
  messagingSenderId: "790765794096",
  appId: "1:790765794096:web:016459d32d5aa82783cef5",
  measurementId: "G-3M5Y4QJCK1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);


const handleSignup = (event) => {
  event.preventDefault();
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert('User signed up successfully!');
      window.location.href = 'index.html'; e
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};


const handleLogin = (event) => {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert('User logged in successfully!');
      window.location.href = 'index.html'; 
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

onAuthStateChanged(auth, (user) => {
  if (user && (window.location.pathname === '/login.html' || window.location.pathname === '/signup.html')) {
    window.location.href = 'index.html';
  }
});





document.addEventListener('submitted', () => {
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', handleSignup);
  }

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  if (window.location.pathname === '/upload.html') {
    authGuard();
  }
});
