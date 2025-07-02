document.getElementById('form-login').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };

  const res = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (res.ok) {
    localStorage.setItem('token', result.token);
    localStorage.setItem('rol', result.rol);
    alert('Sesión iniciada');
    window.location.href = result.rol === 'admin' ? 'inventario.html' : 'index.html';
  } else {
    alert(result.error);
  }
});
