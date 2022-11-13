const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/errors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

//importar rutas
const productos = require('./routes/products');
const usuarios = require('./routes/auth');
const ordenes = require('./routes/orders');


app.use('/api', productos);
app.use('/api', usuarios);
app.use('/api', ordenes);

app.use(errorMiddleware);

module.exports = app;