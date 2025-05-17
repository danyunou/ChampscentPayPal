function pagar() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const userId = 1; // Puedes cambiar esto por el ID real del usuario

  if (carrito.length === 0) {
    alert('El carrito está vacío.');
    return;
  }

  fetch('http://localhost:3000/api/cart/pagar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cart: carrito, userId: userId })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la compra');
      }
      return response.json();
    })
    .then(data => {
      alert('Compra realizada. Descargando factura...');
      localStorage.removeItem('carrito');

      fetch(`http://localhost:3000/facturas/${data.factura}`)
        .then(res => res.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = data.factura;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        });
    })
    .catch(error => {
      alert('Error al pagar: ' + error.message);
      console.error(error);
    });
}



