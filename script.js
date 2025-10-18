import { db } from "./srcfirebaseConfig.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";


let loggedUser = null;
let userObj = null;

async function register() {
  const username = document.getElementById("regUsername").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  if (!username || !password) return alert("Preencha todos os campos!");

  const q = query(collection(db, "usuarios"), where("usuario", "==", username));
  const snapshot = await getDocs(q);
  if (!snapshot.empty) return alert("Usuário já existe!");

  await addDoc(collection(db, "usuarios"), { usuario: username, senha: password, tipoUsuario: "usuário" });
  alert("Usuário registrado!");
  showLogin();
}

async function login() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const q = query(collection(db, "usuarios"), where("usuario", "==", username), where("senha", "==", password));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return alert("Usuário ou senha incorretos!");
  userObj = snapshot.docs[0].data();
  loggedUser = userObj.usuario;
  showMain();
}

function logoff() {
  loggedUser = null;
  userObj = null;
  showLogin();
}

async function loadReservations() {
  const snapshot = await getDocs(collection(db, "agendamentos"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function createReservation() {
  const titulo = document.getElementById("titulo").value;
  const data = document.getElementById("data").value;
  const inicio = document.getElementById("horaInicio").value;
  const fim = document.getElementById("horaFim").value;
  if (!titulo || !data || !inicio || !fim) return alert("Preencha todos os campos!");
  await addDoc(collection(db, "agendamentos"), { titulo, data, horarioInicio: inicio, horarioFim: fim, organizador: loggedUser });
  renderTable();
}

async function excluir(id) {
  await deleteDoc(doc(db, "agendamentos", id));
  renderTable();
}

async function renderTable() {
  const tableBody = document.querySelector("#meetingTable tbody");
  tableBody.innerHTML = "";
  const reservas = await loadReservations();
  reservas.forEach(r => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${r.titulo}</td>
      <td>${r.organizador}</td>
      <td>${r.data}</td>
      <td>${r.horarioInicio}</td>
      <td>${r.horarioFim}</td>
      <td>
        <button class="action-btn delete-btn" onclick="excluir('${r.id}')">Excluir</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Preenche horários
function initTimeSelectors() {
  const start = document.getElementById("horaInicio");
  const end = document.getElementById("horaFim");
  for (let h=8; h<=18; h++) {
    const hr = h.toString().padStart(2,"0");
    start.innerHTML += `<option value="${hr}:00">${hr}:00</option>`;
    start.innerHTML += `<option value="${hr}:30">${hr}:30</option>`;
    end.innerHTML += `<option value="${hr}:00">${hr}:00</option>`;
    end.innerHTML += `<option value="${hr}:30">${hr}:30</option>`;
  }
}
initTimeSelectors();

function showLogin() { document.getElementById("loginSection").style.display="block"; document.getElementById("registerSection").style.display="none"; document.getElementById("mainSection").style.display="none"; document.getElementById("logoffBtn").style.display="none"; }
function showRegister() { document.getElementById("loginSection").style.display="none"; document.getElementById("registerSection").style.display="block"; }
function showMain() { document.getElementById("loginSection").style.display="none"; document.getElementById("registerSection").style.display="none"; document.getElementById("mainSection").style.display="block"; document.getElementById("logoffBtn").style.display="inline-block"; renderTable(); }

window.login = login;
window.register = register;
window.showLogin = showLogin;
window.showRegister = showRegister;
window.logoff = logoff;
window.createReservation = createReservation;
window.excluir = excluir;


