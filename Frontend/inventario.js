const API = 'http://localhost:3000/productos';
const TOKEN = localStorage.getItem('token');

if (localStorage.getItem('rol') === 'admin') {
  cargarProductos();
} else {
  alert('Acceso denegado.');
  window.location.href = 'index.html';
}

function cargarProductos() {
  fetch(API, {
    headers: {
      'authorization': `Bearer ${TOKEN}`
    }
  })
    .then(res => res.json())
    .then(data => {
      const tabla = document.getElementById('tabla-productos');
      tabla.innerHTML = '';
      data.forEach(p => {
        tabla.innerHTML += `
          <tr>
            <td><input value="${p.nombre}" onchange="editar('${p._id}', 'nombre', this.value)" /></td>
            <td><input value="${p.descripcion}" onchange="editar('${p._id}', 'descripcion', this.value)" /></td>
            <td><input type="number" value="${p.precio}" onchange="editar('${p._id}', 'precio', this.value)" /></td>
            <td><input type="number" value="${p.stock}" onchange="editar('${p._id}', 'stock', this.value)" /></td>
            <td><input value="${p.imagen}" onchange="editar('${p._id}', 'imagen', this.value)" /></td>
            <td><button onclick="eliminar('${p._id}')">❌</button></td>
          </tr>
        `;
      });
    });
}

function editar(id, campo, valor) {
  fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${TOKEN}`
    },
    body: JSON.stringify({ [campo]: valor })
  }).then(() => cargarProductos());
}

function eliminar(id) {
  fetch(`${API}/${id}`, {
    method: 'DELETE',
    headers: {
      'authorization': `Bearer ${TOKEN}`
    }
  }).then(() => cargarProductos());
}

function agregarProducto() {
  const nombre = document.getElementById('nuevoNombre').value;
  const descripcion = document.getElementById('nuevoDesc').value;
  const precio = parseFloat(document.getElementById('nuevoPrecio').value);
  const stock = parseInt(document.getElementById('nuevoStock').value);
  const imagen = document.getElementById('nuevoImagen').value;

  fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${TOKEN}`
    },
    body: JSON.stringify({ nombre, descripcion, precio, stock, imagen })
  }).then(() => cargarProductos());
}
