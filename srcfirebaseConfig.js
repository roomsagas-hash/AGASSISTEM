<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
