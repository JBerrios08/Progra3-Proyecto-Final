// ======================================
//  PANEL PRODUCTOS - PERMISOS CORRECTOS
// ======================================

// Admin y supervisor pueden crear/editar. Team solo puede ver.
requireRole(["admin", "supervisor", "team"]);
const user = getSession();

const rolInfo = document.querySelector("#rolInfo");
const btnUsuarios = document.querySelector("#btnUsuarios");
const catSelect = document.querySelector("#catSelect");
const tabla = document.querySelector("#tablaProductos");
const form = document.querySelector("#formProducto");

rolInfo.textContent = `Rol actual: ${user.rol}`;

// Mostrar botón usuarios solo admin
if (user.rol === "admin") btnUsuarios.classList.remove("d-none");

// TEAM: solo lectura (sin formulario)
if (user.rol === "team") {
  form.remove();
}

// Cargar categorías
const cats = getLS(LS.categories);

if (catSelect) {
  if (cats.length === 0) {
    catSelect.innerHTML = "<option disabled selected>No hay categorías disponibles</option>";
    catSelect.setAttribute("disabled", "disabled");
  } else {
    catSelect.innerHTML = cats.map(c =>
      `<option value="${c.idCategoria}">${c.nombreCategoria}</option>`
    ).join("");
    catSelect.removeAttribute("disabled");
  }
}

// Helpers
function catName(idCat){
  const c = cats.find(x => x.idCategoria == idCat);
  return c ? c.nombreCategoria : "Sin categoría";
}

function fileToBase64(file){
  return new Promise((resolve,reject)=>{
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

// Render tabla con acciones por rol
function renderTabla(){
  const products = getLS(LS.products);

  tabla.innerHTML = products.map(p => {
    const acciones = (user.rol === "team")
      ? `<span class="text-muted small">Solo lectura</span>`
      : `
        <button class="btn btn-sm btn-outline-primary me-1" onclick="editProd(${p.idProducto})">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteProd(${p.idProducto})">
          <i class="fa-solid fa-trash"></i>
        </button>
      `;

    return `
      <tr>
        <td><img src="${p.imagen_data}" width="55" style="object-fit:cover;border-radius:8px"></td>
        <td class="fw-semibold">${p.nombreProducto}</td>
        <td>$${p.precio.toFixed(2)}</td>
        <td>${p.stock}</td>
        <td>${catName(p.idCategoria)}</td>
        <td>${acciones}</td>
      </tr>
    `;
  }).join("");
}
renderTabla();

// Crear producto (admin y supervisor)
form?.addEventListener("submit", async (e)=>{
  e.preventDefault();
  if(user.rol === "team") return;

  const fd = new FormData(form);
  const base64 = await fileToBase64(fd.get("imagen"));

  const nuevo = {
    idProducto: Date.now(),
    nombreProducto: fd.get("nombreProducto"),
    descripcion: fd.get("descripcion"),
    precio: parseFloat(fd.get("precio")),
    stock: parseInt(fd.get("stock")),
    idCategoria: parseInt(fd.get("idCategoria")),
    imagen_data: base64
  };

  const products = getLS(LS.products);
  products.push(nuevo);
  setLS(LS.products, products);

  form.reset();
  renderTabla();
  alert("Producto agregado.");
});

// Eliminar producto (admin y supervisor)
window.deleteProd = (id)=>{
  if(!["admin","supervisor"].includes(user.rol)){
    alert("No tienes permisos para eliminar.");
    return;
  }
  let products = getLS(LS.products);
  products = products.filter(p => p.idProducto !== id);
  setLS(LS.products, products);
  renderTabla();
};

// Editar producto (admin y supervisor)
window.editProd = (id)=>{
  if(!["admin","supervisor"].includes(user.rol)){
    alert("No tienes permisos para editar.");
    return;
  }

  const products = getLS(LS.products);
  const p = products.find(x=>x.idProducto===id);
  if(!p) return;

  const nombre = prompt("Nombre:", p.nombreProducto);
  if(nombre===null) return;

  const descripcion = prompt("Descripción:", p.descripcion);
  if(descripcion===null) return;

  const precio = parseFloat(prompt("Precio:", p.precio));
  if(isNaN(precio)) return alert("Precio inválido.");

  const stock = parseInt(prompt("Stock:", p.stock));
  if(isNaN(stock)) return alert("Stock inválido.");

  p.nombreProducto = nombre;
  p.descripcion = descripcion;
  p.precio = precio;
  p.stock = stock;

  setLS(LS.products, products);
  renderTabla();
};
