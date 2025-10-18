// srcfirebaseConfig.js

// Importa as funções necessárias do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

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

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore
const db = getFirestore(app);

// Exporta o db para ser usado em outros arquivos
export { db };
