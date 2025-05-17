const path = require('path');
const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');
const cartRoutes = require('./routes/cart'); 
require('./db/connection');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/perfumeShop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();
app.use(cors());
app.use(express.json());
app.use('/productos', productsRouter);
app.use('/images', express.static('public/images'));
app.use('/api/cart', cartRoutes);

app.use('/facturas', express.static(path.join(__dirname, 'facturas')));

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
