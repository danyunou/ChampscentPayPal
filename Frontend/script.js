const API_URL = 'http://localhost:3000/productos';
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener('DOMContentLoaded', () => {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => mostrarProductos(data));
});

function mostrarProductos(productos) {
  const lista = document.getElementById('product-list');

  productos.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    const agotado = p.stock <= 0;

    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" />
      <h3>${p.nombre}</h3>
      <p>${p.descripcion}</p>
      <p><strong>$${p.precio}</strong></p>
      <p>Stock: ${p.stock > 0 ? p.stock : '<span style="color:red">Agotado</span>'}</p>
      <button onclick='agregarAlCarrito(${JSON.stringify(p)})' ${agotado ? 'disabled' : ''}>
        ${agotado ? 'Agotado' : 'Agregar al carrito'}
      </button>
    `;
    lista.appendChild(card);
  });
}


function agregarAlCarrito(producto) {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  const index = carrito.findIndex(p => p.id === producto._id);
  if (index !== -1) {
    carrito[index].cantidad += 1;
  } else {
    carrito.push({
      id: producto._id,              // ✅ solo el _id como string
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1
    });
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert(`${producto.nombre} añadido al carrito`);
}



function actualizarCarrito() {
  const lista = document.getElementById('carrito-list');
  const totalEl = document.getElementById('total');
  lista.innerHTML = '';

  let total = 0;
  carrito.forEach((p, i) => {
    total += p.precio * p.cantidad;

    const item = document.createElement('li');
    item.innerHTML = `
      ${p.nombre} - $${p.precio} x ${p.cantidad}
      <button onclick="eliminar(${i})">❌</button>
    `;
    lista.appendChild(item);
  });

  totalEl.textContent = `Total: $${total.toFixed(2)}`;
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminar(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function vaciarCarrito() {
  carrito.length = 0;
  actualizarCarrito();
}
