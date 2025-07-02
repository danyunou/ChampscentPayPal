const API_URL = 'http://localhost:3000/productos';
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener('DOMContentLoaded', () => {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => mostrarProductos(data));
});

function mostrarProductos(productos) {
  const lista = document.getElementById('product-list');
  lista.innerHTML = ''; // limpiar antes de renderizar

  productos.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    const agotado = p.stock <= 0;

    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" />
      <h3>${p.nombre}</h3>
      <p class="precio"><strong>$${p.precio}</strong></p>
      <p>Stock: ${agotado ? '<span style="color:red">Agotado</span>' : p.stock}</p>
      <button onclick='verMas(${JSON.stringify(JSON.stringify(p))})'>Ver más</button>
      <button onclick='agregarAlCarrito(${JSON.stringify(p)})' ${agotado ? 'disabled' : ''}>
        ${agotado ? 'Agotado' : 'Agregar al carrito'}
      </button>
    `;
    lista.appendChild(card);
  });
}

function verMas(productoData) {
  const p = typeof productoData === 'string' ? JSON.parse(productoData) : productoData;
  document.getElementById("modal-img").src = p.imagen;
  document.getElementById("modal-nombre").innerText = p.nombre;
  document.getElementById("modal-desc").innerText = p.descripcion;
  document.getElementById("modal-precio").innerText = `Precio: $${p.precio}`;
  document.getElementById("modal-stock").innerText = `Stock disponible: ${p.stock}`;
  document.getElementById("modal").classList.remove("hidden");
}


function cerrarModal() {
  document.getElementById("modal").classList.add("hidden");
}

function agregarAlCarrito(producto) {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  const index = carrito.findIndex(p => p.id === producto._id);
  if (index !== -1) {
    carrito[index].cantidad += 1;
  } else {
    carrito.push({
      id: producto._id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1
    });
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert(`${producto.nombre} añadido al carrito`);
}
