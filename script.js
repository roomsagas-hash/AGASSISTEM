import { getFirestore, collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// ---------- FIREBASE ----------
const db = window.db;

// ---------- VARIÁVEIS ----------
let loggedUser = null;
let userObj = null;

// ---------- FUNÇÕES DE USUÁRIO ----------

async function getUsers() {
  const snapshot = await getDocs(collection(db, "usuarios"));
  const users = [];
  snapshot.forEach(doc => users.push({ id: doc.id, ...doc.data() }));
  return users;
}

async function register() {
  const username = document.getElementById("regUsername").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const question = document.getElementById("regQuestion").value.trim();
  const answer = document.getElementById("regAnswer").value.trim();
  if (!username || !password || !question || !answer) return alert("Preencha todos os campos!");

  const q = query(collection(db, "usuarios"), where("usuario", "==", username));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) return alert("Usuário já existe!");

  await addDoc(collection(db, "usuarios"), {
    usuario: username,
    senha: password,
    nome: username,
    palavraChave: question,
    tipoUsuario: "usuário"
  });

  alert("Usuário registrado com sucesso!");
  showLogin();
}

async function login() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  const q = query(collection(db, "usuarios"), where("usuario", "==", username), where("senha", "==", password));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) return alert("Usuário ou senha incorretos!");

  const user = querySnapshot.docs[0].data();
  loggedUser = user.usuario;
  userObj = user;
  showMain();
}

function logoff() {
  loggedUser = null;
  userObj = null;
  showLogin();
}

// ---------- FUNÇÕES DE RESERVAS ----------

async function loadReservations() {
  const snapshot = await getDocs(collection(db, "agendamentos"));
  const reservas = [];
  snapshot.forEach(doc => reservas.push({ id: doc.id, ...doc.data() }));
  return reservas;
}

async function createReservation() {
  const titulo = document.getElementById("titulo").value;
  const data = document.getElementById("data").value;
  const inicio = document.getElementById("horaInicio").value;
  const fim = document.getElementById("horaFim").value;

  if (!titulo || !data || !inicio || !fim) return alert("Preencha todos os campos!");
  if (inicio >= fim) return alert("Fim deve ser depois do início!");

  const reservas = await loadReservations();
  if (reservas.some(r => r.data === data && ((inicio >= r.horarioInicio && inicio < r.horarioFim) || (fim > r.horarioInicio && fim <= r.horarioFim) || (inicio <= r.horarioInicio && fim >= r.horarioFim)))) {
    return alert("Já existe uma reserva nesse intervalo!");
  }

  await addDoc(collection(db, "agendamentos"), {
    titulo,
    organizador: loggedUser,
    data,
    horarioInicio: inicio,
    horarioFim: fim
  });

  renderTable();
}

async function excluir(id) {
  await deleteDoc(doc(db, "agendamentos", id));
  renderTable();
}

async function editar(id) {
  const reservaDoc = doc(db, "agendamentos", id);
  const reservas = await loadReservations();
  const r = reservas.find(r => r.id === id);
  if (!r) return alert("Reserva não encontrada!");

  document.getElementById("titulo").value = r.titulo;
  document.getElementById("data").value = r.data;
  document.getElementById("horaInicio").value = r.horarioInicio;
  document.getElementById("horaFim").value = r.horarioFim;

  await deleteDoc(reservaDoc);
  renderTable();
}

// ---------- RENDERIZAÇÃO ----------

async function renderTable() {
  const tableBody = document.querySelector("#meetingTable tbody");
  tableBody.innerHTML = "";

  const reservas = await loadReservations();
  reservas.forEach(r => {
    let actionBtns = "";
    if (userObj?.tipoUsuario === "adm" || r.organizador === loggedUser) {
      actionBtns = `
        <button class="action-btn edit-btn" onclick="editar('${r.id}')">Editar</button>
        <button class="action-btn delete-btn" onclick="excluir('${r.id}')">Excluir</button>
      `;
    } else {
      actionBtns = `<span class="view-only">Visualização</span>`;
    }

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${r.titulo}</td>
      <td>${r.organizador}</td>
      <td>${r.data}</td>
      <td>${r.horarioInicio}</td>
      <td>${r.horarioFim}</td>
      <td>${actionBtns}</td>
    `;
    tableBody.appendChild(row);
  });
}

// ---------- GERENCIAMENTO DE USUÁRIOS (ADM) ----------

async function renderUsersTable() {
  if (!userObj || userObj.tipoUsuario !== "adm") return;
  const users = await getUsers();
  const tbody = document.querySelector("#usersTable tbody");
  tbody.innerHTML = "";

  users.forEach(u => {
    const actions = u.usuario !== "adm" ? `
      <button class="action-btn delete-btn" onclick="deleteUser('${u.id}')">Excluir</button>
      <button class="action-btn reset-btn" onclick="forceReset('${u.id}')">Redefinir Senha</button>
      <button class="action-btn promote-btn" onclick="toggleAdmin('${u.id}', '${u.tipoUsuario}')">${u.tipoUsuario === "adm" ? "Rebaixar" : "Promover"} ADM</button>
      <button class="action-btn edit-btn" onclick="editUserName('${u.id}', '${u.usuario}')">Ajustar</button>
    ` : `<span class="view-only">Protegido</span>`;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${u.usuario}</td>
      <td>${u.tipoUsuario}</td>
      <td>${actions}</td>
    `;
    tbody.appendChild(row);
  });
}

async function deleteUser(id) {
  if (!confirm("Deseja excluir este usuário?")) return;
  await deleteDoc(doc(db, "usuarios", id));
  renderUsersTable();
  renderTable();
}

async function forceReset(id) {
  const newPass = prompt("Digite a nova senha:");
  if (!newPass) return;
  await updateDoc(doc(db, "usuarios", id), { senha: newPass });
  alert("Senha redefinida!");
}

async function toggleAdmin(id, tipoAtual) {
  const novoTipo = tipoAtual === "adm" ? "usuário" : "adm";
  await updateDoc(doc(db, "usuarios", id), { tipoUsuario: novoTipo });
  renderUsersTable();
}

async function editUserName(id, oldName) {
  const newName = prompt("Digite o novo nome de usuário:", oldName);
  if (!newName) return;
  const q = query(collection(db, "usuarios"), where("usuario", "==", newName));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) return alert("Nome já em uso!");

  await updateDoc(doc(db, "usuarios", id), { usuario: newName });
  renderUsersTable();
}

// ---------- INTERFACE ----------

function showLogin() {
  document.getElementById("loginSection").style.display = "block";
  document.getElementById("registerSection").style.display = "none";
  document.getElementById("recoverySection").style.display = "none";
  document.getElementById("mainSection").style.display = "none";
  document.getElementById("logoffBtn").style.display = "none";
  document.getElementById("statusBar").innerText = "";
}

function showRegister() {
  document.getElementById("loginSection").style.display = "none";
  document.getElementById("registerSection").style.display = "block";
}

function showMain() {
  document.getElementById("loginSection").style.display = "none";
  document.getElementById("registerSection").style.display = "none";
  document.getElementById("recoverySection").style.display = "none";
  document.getElementById("mainSection").style.display = "block";
  document.getElementById("logoffBtn").style.display = "inline-block";
  document.getElementById("statusBar").innerText = `Usuário: ${loggedUser} ${userObj?.tipoUsuario === "adm" ? "(ADM)" : ""}`;

  renderTable();
  renderUsersTable();
}

// ---------- EVENTOS ----------
document.getElementById("logoffBtn").addEventListener("click", logoff);
document.getElementById("bookBtn").addEventListener("click", createReservation);
