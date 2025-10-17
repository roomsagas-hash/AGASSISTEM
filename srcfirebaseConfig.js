// Importa as funções necessárias dos SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Configuração do Firebase do seu aplicativo web
const firebaseConfig = {
  apiKey: "AIzaSyDAwONtoCt_V58d3IWstkak6aK5vkBwdks",
  authDomain: "agas-5ba41.firebaseapp.com",
  databaseURL: "https://agas-5ba41-default-rtdb.firebaseio.com",
  projectId: "agas-5ba41",
  storageBucket: "agas-5ba41.firebasestorage.app",
  messagingSenderId: "389907250431",
  appId: "1:389907250431:web:a26f89ab3c1c428f167cb2",
  measurementId: "G-PqR26VX3NV"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
