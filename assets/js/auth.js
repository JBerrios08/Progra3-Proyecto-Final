// ======================================
//  AUTH + ROLES - FERRO ORIENTE
// ======================================

function getSession() {
  return JSON.parse(localStorage.getItem(LS.session) || "null");
}

function setSession(user) {
  const sessionSafeUser = {
    idUsuario: user.idUsuario,
    nombre: user.nombre,
    correo: user.correo,
    rol: user.rol
  };
  localStorage.setItem(LS.session, JSON.stringify(sessionSafeUser));
}

function logout() {
  localStorage.removeItem(LS.session);
  location.href = "login.html";
}

function login(correo, password) {
  const users = getLS(LS.users);
  const user = users.find(
    u => u.correo === correo && u.password === password
  );

  if (!user) return { ok: false, msg: "Correo o contraseña incorrectos" };

  setSession(user);
  return { ok: true, user: getSession() };
}

function register(nombre, correo, password) {
  const users = getLS(LS.users);

  if (!nombre.trim()) return { ok: false, msg: "Nombre requerido" };
  if (!correo.includes("@")) return { ok: false, msg: "Correo inválido" };
  if (password.length < 6) return { ok: false, msg: "Contraseña mínima de 6 caracteres" };

  if (users.some(u => u.correo === correo)) {
    return { ok: false, msg: "Ese correo ya está registrado" };
  }

  const nuevo = {
    idUsuario: Date.now(),
    nombre,
    correo,
    password,
    rol: "usuario"
  };

  users.push(nuevo);
  setLS(LS.users, users);
  return { ok: true };
}

function requireRole(roles = []) {
  const user = getSession();
  if (!user) {
    location.href = "login.html";
    return;
  }

  if (!roles.includes(user.rol)) {
    alert("No tienes permisos para acceder a esta sección.");
    location.href = "tienda.html";
  }
}
