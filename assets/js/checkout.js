// ======================================
//  CHECKOUT + VENTA LOCAL - FERRO ORIENTE
// ======================================

function checkout() {
  const user = getSession();
  if (!user) {
    alert("Debes iniciar sesión para comprar.");
    location.href = "login.html";
    return;
  }

  const cart = getCart();
  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  // Validar stock real local
  let products = getLS(LS.products);

  for (const item of cart) {
    const p = products.find(x => x.idProducto === item.idProducto);
    if (!p) {
      alert("Un producto ya no existe.");
      return;
    }
    if (item.cantidad > p.stock) {
      alert(`Stock insuficiente para ${p.nombreProducto}`);
      return;
    }
  }

  // Descontar stock
  cart.forEach(item => {
    const p = products.find(x => x.idProducto === item.idProducto);
    p.stock -= item.cantidad;
  });
  setLS(LS.products, products);

  const venta = {
    idVenta: Date.now(),
    ticket: "T" + Date.now(),
    cliente: user.nombre,
    correo: user.correo,
    fecha: new Date().toLocaleString(),
    items: cart,
    total: cartTotal()
  };

  // Guardar venta
  const sales = getLS(LS.sales);
  sales.push(venta);
  setLS(LS.sales, sales);

  // Guardar el último ticket para mostrarlo
  localStorage.setItem(LS.lastTicket, JSON.stringify(venta));

  // Vaciar carrito
  clearCart();

  // Redirigir a carrito con ticket visible
  location.href = "carrito.html?ticket=1";
}
