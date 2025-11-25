// ======================================
//  CRUD USUARIOS - SOLO ADMIN
// ======================================

requireRole(["admin"]);
const user = getSession();

const formUser = document.querySelector("#formUser");
const tablaUsers = document.querySelector("#tablaUsers");

function renderUsers(){
  const users = getLS(LS.users);

  tablaUsers.innerHTML = users.map(u => `
    <tr>
      <td>${u.nombre}</td>
      <td>${u.correo}</td>
      <td class="text-capitalize">${u.rol}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="editUser(${u.idUsuario})">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteUser(${u.idUsuario})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join("");
}
renderUsers();

formUser.addEventListener("submit", (e)=>{
  e.preventDefault();

  const fd = new FormData(formUser);
  const nombre = fd.get("nombre").trim();
  const correo = fd.get("correo").trim();
  const password = fd.get("password").trim();
  const rol = fd.get("rol");

  let users = getLS(LS.users);

  if(users.some(x=>x.correo===correo)){
    return alert("Ese correo ya existe.");
  }

  users.push({
    idUsuario: Date.now(),
    nombre, correo, password, rol
  });

  setLS(LS.users, users);
  formUser.reset();
  renderUsers();
  alert("Usuario creado.");
});

window.deleteUser = (id)=>{
  let users = getLS(LS.users);

  // evitar borrarse a sí mismo
  if(id === user.idUsuario){
    return alert("No puedes eliminar tu propia cuenta.");
  }

  users = users.filter(u=>u.idUsuario!==id);
  setLS(LS.users, users);
  renderUsers();
};

window.editUser = (id)=>{
  let users = getLS(LS.users);
  const u = users.find(x=>x.idUsuario===id);
  if(!u) return;

  const nombre = prompt("Nombre:", u.nombre);
  if(nombre===null) return;

  const rol = prompt("Rol (admin/supervisor/team/usuario):", u.rol);
  if(rol===null) return;

  if(!["admin","supervisor","team","usuario"].includes(rol)){
    return alert("Rol inválido.");
  }

  u.nombre = nombre;
  u.rol = rol;

  setLS(LS.users, users);
  if (u.idUsuario === user.idUsuario) {
    setSession(u);
  }
  renderUsers();
};
