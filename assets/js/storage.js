// ======================================
//  STORAGE ENGINE - FERRO ORIENTE
// ======================================

const LS = {
  categories: "fo_categories",
  products: "fo_products",
  users: "fo_users",
  cart: "fo_cart",
  sales: "fo_sales",
  session: "fo_session",
  lastTicket: "fo_last_ticket"
};

function initStorage() {
  // Asegurar que las categorías existan siempre para poblar selects
  const storedCategories = localStorage.getItem(LS.categories);
  if (!storedCategories) {
    localStorage.setItem(LS.categories, JSON.stringify(seedCategories));
  } else {
    try {
      const parsed = JSON.parse(storedCategories);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        localStorage.setItem(LS.categories, JSON.stringify(seedCategories));
      }
    } catch (err) {
      // Datos corruptos: resembrar
      localStorage.setItem(LS.categories, JSON.stringify(seedCategories));
    }
  }
  if (!localStorage.getItem(LS.products)) {
    localStorage.setItem(LS.products, JSON.stringify(seedProducts));
  } else {
    // Reparar productos existentes que no tengan ruta/imagen para evitar tarjetas vacías
    const products = getLS(LS.products);
    const seedsById = new Map(seedProducts.map(p => [p.idProducto, p.imagen_data]));
    let touched = false;

    // Sincronizar nuevas semillas que se agreguen en el tiempo
    seedProducts.forEach(seed => {
      if (!products.some(p => p.idProducto === seed.idProducto)) {
        products.push(seed);
        touched = true;
      }
    });

    products.forEach(p => {
      // Migrar del antiguo campo "imagen" y validar rutas/base64
      if (!p.imagen_data && p.imagen) {
        p.imagen_data = p.imagen;
        touched = true;
      }

      if (!p.imagen_data || String(p.imagen_data).trim() === "") {
        p.imagen_data = seedsById.get(p.idProducto) || "assets/img/productos/martillo.png";
        touched = true;
      }
    });

    if (touched) setLS(LS.products, products);
  }
  if (!localStorage.getItem(LS.users)) {
    localStorage.setItem(LS.users, JSON.stringify(seedUsers));
  }
  if (!localStorage.getItem(LS.cart)) {
    localStorage.setItem(LS.cart, JSON.stringify([]));
  }
  if (!localStorage.getItem(LS.sales)) {
    localStorage.setItem(LS.sales, JSON.stringify([]));
  }
}

function getLS(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}

function setLS(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

initStorage();
