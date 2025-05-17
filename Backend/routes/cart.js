const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const Product = require('../models/productModel'); // tu modelo mongoose
const { ObjectId } = require('mongoose').Types; // ✅ aquí agregas esto


router.post('/pagar', async (req, res) => {
  const { cart, userId } = req.body;

  if (!cart || cart.length === 0) {
    return res.status(400).json({ message: 'Carrito vacío.' });
  }

  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `factura-${userId}-${timestamp}.xml`;
    const filePath = path.join(__dirname, `../facturas/${fileName}`);

    let total = 0;
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<factura>\n  <clienteId>${userId}</clienteId>\n  <productos>\n`;

    for (const item of cart) {
        const id = item.id;
        const nombre = item.nombre;
        const cantidad = parseInt(item.cantidad);
        const precio = parseFloat(item.precio);

        if (isNaN(cantidad) || cantidad <= 0) {
            return res.status(400).json({ message: `Cantidad inválida para el producto ${nombre}` });
        }

        const result = await Product.updateOne(
            { _id: new ObjectId(id), stock: { $gte: cantidad } },
            { $inc: { stock: -cantidad } }
        );

        if (result.modifiedCount === 0) {
            return res.status(400).json({ message: `No hay suficiente stock para el producto con ID ${id}` });
        }

        // Agregar al XML
        xml += `    <producto>\n`;
        xml += `      <id>${id}</id>\n`;
        xml += `      <nombre>${nombre}</nombre>\n`;
        xml += `      <cantidad>${cantidad}</cantidad>\n`;
        xml += `      <precio>${precio}</precio>\n`;
        xml += `    </producto>\n`;

        total += cantidad * precio;
    }


    xml += `  </productos>\n  <total>${total.toFixed(2)}</total>\n</factura>`;
    fs.writeFileSync(filePath, xml);

    res.status(200).json({ message: 'Compra realizada', factura: fileName });

  } catch (err) {
    console.error('❌ Error al procesar el pago:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;
