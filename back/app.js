const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/errors');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

//importar rutas
const productos = require('./routes/products');
const usuarios = require('./routes/auth');
const ordenes = require('./routes/orders');


app.use('/api', productos);
app.use('/api', usuarios);
app.use('/api', ordenes);

app.use(errorMiddleware);

module.exports = app;