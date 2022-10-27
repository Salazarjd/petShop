const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/errors');

app.use(express.json());

//importar rutas
const productos = require('./routes/products');
const usuarios = require('./routes/auth');

app.use('/api', productos);
app.use('/api', usuarios);

app.use(errorMiddleware);

module.exports = app;