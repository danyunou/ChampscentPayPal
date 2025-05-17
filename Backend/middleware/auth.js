// Backend/middleware/auth.js
const PASSWORD = 'admin123'; // Cambia esto por seguridad

function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];

  if (token === PASSWORD) {
    return next();
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = authMiddleware;
