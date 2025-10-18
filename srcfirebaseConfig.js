// Importa as funções dos SDKs necessários
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Configuração do Firebase do seu aplicativo web
const firebaseConfig = {
  apiKey: "AIzaSyDAwN0tOct_V5Bd13WstakGaK5vBkwdks",
  authDomain: "agas-5b4a1.firebaseapp.com",
  projectId: "agas-5b4a1",
  storageBucket: "agas-5b4a1.appspot.com",
  messagingSenderId: "38990725431",
  appId: "1:38990725431:web:a26f89ab31c428f167cb2",
  measurementId: "G-PqR26VGX3N"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
