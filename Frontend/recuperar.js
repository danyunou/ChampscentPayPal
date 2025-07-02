document.getElementById('form-recuperar').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    email: document.getElementById('email').value,
    preguntaSeguridad: document.getElementById('pregunta').value,
    respuestaSeguridad: document.getElementById('respuesta').value,
    nuevaPassword: document.getElementById('nuevaPassword').value
  };

  const res = await fetch('http://localhost:3000/auth/recuperar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  alert(result.mensaje || result.error);
  if (res.ok) window.location.href = 'login.html';
});
