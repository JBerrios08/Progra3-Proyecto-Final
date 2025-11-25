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
  if (!localStorage.getItem(LS.categories)) {
    localStorage.setItem(LS.categories, JSON.stringify(seedCategories));
  }
  if (!localStorage.getItem(LS.products)) {
    localStorage.setItem(LS.products, JSON.stringify(seedProducts));
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
