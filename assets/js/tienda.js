// ======================================
//  TIENDA RENDER - FERRO ORIENTE
// ======================================

const grid = document.querySelector("#productosGrid");
const filter = document.querySelector("#categoriaFilter");

function renderCategorias() {
  const cats = getLS(LS.categories);
  filter.innerHTML =
    `<option value="">Todas</option>` +
    cats.map(c => `<option value="${c.idCategoria}">${c.nombreCategoria}</option>`).join("");
}

function renderProductos(catId = "") {
  const products = getLS(LS.products);
  const filtrados = catId ? products.filter(p => p.idCategoria == catId) : products;

  if (filtrados.length === 0) {
    grid.innerHTML = `<div class="alert alert-warning">No hay productos en esta categoría.</div>`;
    return;
  }

  grid.innerHTML = filtrados.map(p => `
    <div class="col-md-3 mb-3">
      <div class="card card-product h-100 shadow-sm">
        <img src="${p.imagen_data}" class="card-img-top" alt="${p.nombreProducto}">
        <div class="card-body d-flex flex-column">
          <h6 class="fw-bold">${p.nombreProducto}</h6>
          <p class="small text-muted">${p.descripcion}</p>

          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="price">$${p.precio.toFixed(2)}</span>
            <span class="badge bg-secondary badge-stock">Stock: ${p.stock}</span>
          </div>

          <button class="btn btn-primary mt-auto" onclick="addToCart(${p.idProducto})">
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

filter.addEventListener("change", e => renderProductos(e.target.value));

renderCategorias();
renderProductos();
updateCartBadge();
