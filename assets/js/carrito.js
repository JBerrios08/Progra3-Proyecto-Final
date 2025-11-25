function getCart(){ return getLS(LS.cart); }
function saveCart(c){ setLS(LS.cart, c); }

function addToCart(idProducto){
  const products = getLS(LS.products);
  const p = products.find(x => x.idProducto === idProducto);
  if(!p) return;

  let cart = getCart();
  let item = cart.find(i => i.idProducto === idProducto);

  if(item){
    if(item.cantidad + 1 > p.stock){
      alert("Stock insuficiente");
      return;
    }
    item.cantidad++;
  } else {
    cart.push({
      idProducto,
      nombreProducto: p.nombreProducto,
      precio: p.precio,
      cantidad: 1,
      stock: p.stock,
      imagen_data: p.imagen_data
    });
  }
  saveCart(cart);
  updateCartBadge();
}

function updateQty(idProducto, delta){
  let cart = getCart();
  let item = cart.find(i => i.idProducto === idProducto);
  if(!item) return;

  let newQty = item.cantidad + delta;
  if(newQty < 1){
    cart = cart.filter(i => i.idProducto !== idProducto);
  } else if(newQty > item.stock){
    alert("Stock insuficiente");
    return;
  } else {
    item.cantidad = newQty;
  }

  saveCart(cart);
  renderCart();
  updateCartBadge();
}

function cartTotal(){
  return getCart().reduce((acc,i)=> acc + i.precio*i.cantidad, 0);
}

function clearCart(){
  saveCart([]);
  updateCartBadge();
}

function updateCartBadge(){
  const badge = document.querySelector("#cartBadge");
  if(!badge) return;
  const n = getCart().reduce((a,i)=>a+i.cantidad,0);
  badge.textContent = n;
}
