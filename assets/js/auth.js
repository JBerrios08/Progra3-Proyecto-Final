// ======================================
//  AUTH + ROLES - FERRO ORIENTE
// ======================================

function getSession() {
  return JSON.parse(localStorage.getItem(LS.session) || "null");
}

function setSession(user) {
  localStorage.setItem(LS.session, JSON.stringify(user));
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
  return { ok: true, user };
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
  if (!user || !roles.includes(user.rol)) {
    location.href = "login.html";
  }
}
