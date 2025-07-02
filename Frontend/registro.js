document.getElementById('form-registro').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    nombre: document.getElementById('nombre').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    rol: 'cliente', // Asignación fija
    preguntaSeguridad: document.getElementById('pregunta').value,
    respuestaSeguridad: document.getElementById('respuesta').value,
  };

  const res = await fetch('http://localhost:3000/auth/registrar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  alert(result.mensaje || result.error);
  if (res.ok) window.location.href = 'login.html';
});
