const express = require('express');
const router = express.Router();
const { client } = require('../config/paypal'); // según tu ubicación

router.get('/client-id', (req, res) => {
  res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
});

router.post('/create-order', async (req, res) => {
  const total = parseFloat(req.body.total);

  const request = new (require('@paypal/checkout-server-sdk').orders.OrdersCreateRequest)();
  request.prefer("return=representation");
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: total.toFixed(2)
      }
    }]
  });

  try {
    const response = await client().execute(request);
    res.json({ id: response.result.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear orden PayPal' });
  }
});

router.post('/capture-order', async (req, res) => {
  const { orderID } = req.body;
  const request = new (require('@paypal/checkout-server-sdk').orders.OrdersCaptureRequest)(orderID);
  request.requestBody({});

  try {
    const response = await client().execute(request);
    res.json({ status: 'success', details: response.result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al capturar pago' });
  }
});

// Endpoint para enviar el Client ID al frontend
router.get('/client-id', (req, res) => {
  res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
});

module.exports = router;
