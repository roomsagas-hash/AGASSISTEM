import { db } from './firebaseConfig.js';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// variáveis de sessão
let loggedUser = null;
let userObj = null;

/* ============================
   FUNÇÕES DE AUTENTICAÇÃO
============================ */
