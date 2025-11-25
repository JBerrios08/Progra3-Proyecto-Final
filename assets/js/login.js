// ======================================
//  LOGIN & REGISTRO DE USUARIOS
// ======================================

const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");
const loginAlert = document.querySelector("#loginAlert");
const registerAlert = document.querySelector("#registerAlert");

function showAlert(el, msg, type = "danger") {
  if (!el) return;
  el.textContent = msg;
  el.className = `alert alert-${type}`;
  el.classList.remove("d-none");
}

function redirectByRole(user) {
  if (["admin", "supervisor"].includes(user.rol)) {
    location.href = "admin.html";
  } else {
    location.href = "tienda.html";
  }
}

loginForm?.addEventListener("submit", e => {
  e.preventDefault();

  const fd = new FormData(loginForm);
  const correo = fd.get("correo").trim();
  const password = fd.get("password").trim();

  const res = login(correo, password);
  if (!res.ok) {
    showAlert(loginAlert, res.msg);
    return;
  }

  showAlert(loginAlert, "Acceso correcto, redirigiendo...", "success");
  redirectByRole(res.user);
});

registerForm?.addEventListener("submit", e => {
  e.preventDefault();

  const fd = new FormData(registerForm);
  const nombre = fd.get("nombre").trim();
  const correo = fd.get("correo").trim();
  const password = fd.get("password").trim();
  const password2 = fd.get("password2").trim();

  if (password !== password2) {
    showAlert(registerAlert, "Las contraseñas no coinciden");
    return;
  }

  const res = register(nombre, correo, password);
  if (!res.ok) {
    showAlert(registerAlert, res.msg);
    return;
  }

  // Iniciar sesión automáticamente tras registrarse
  const loginRes = login(correo, password);
  showAlert(registerAlert, "Cuenta creada, ingresando...", "success");
  redirectByRole(loginRes.user);
});
