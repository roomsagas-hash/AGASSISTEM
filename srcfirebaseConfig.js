// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDCAwnOEtcZ_v583dJWstak6ak5vkBvdks",
  authDomain: "agas-5ba41.firebaseapp.com",
  databaseURL: "https://agas-5ba41-default-rtdb.firebaseio.com",
  projectId: "agas-5ba41",
  storageBucket: "agas-5ba41.firebasestorage.app",
  messagingSenderId: "389307205431",
  appId: "1:389307205431:web:a26f89abc31c428f167cb2",
  measurementId: "G-PQ8Z6NX3VN"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializa Firestore
const db = getFirestore(app);

// Exporta o db para ser usado no script principal
export { db };
