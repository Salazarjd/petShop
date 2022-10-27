const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const producto = require('../models/products');
const ErrorHandler = require('../utils/errorHandler');
const fetch = (url) => import('node-fetch').then(({ default: fetch }) => fetch(url));

//ver la lista de productos
exports.getProducts = catchAsyncErrors( async(req, res, next) => {

    const productos = await producto.find();
    if (!productos) {
        return next(new ErrorHandler('Productos no encontrados', 404));
    }

    res.status(200).json({
        success: true,
        count: productos.length,
        productos
    });
})

//buscar producto by id
exports.getProductById = catchAsyncErrors( async (req, res, next) => {
    
    const product = await producto.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Producto no encontrado', 404));
    }

    res.status(200).json({
        success: true,
        message:"Aqui encuentras información del producto",
        product
    })
})

//Crear nuevo producto
exports.newProduct = catchAsyncErrors( async (req, res, next) => {
    const product = await producto.create(req.body);

    res.status(201).json({
        success: true,
        product
    });
})

//update un producto
exports.updateProduct = catchAsyncErrors( async (req, res, next) => {
    let productoById = await producto.findById(req.params.id);
    if (!productoById) {
        return next(new ErrorHandler('Producto no encontrado', 404));
    }

    productoById = await producto.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    
    res.status(200).json({
        success: true,
        message: 'Producto actualizado correctamente',
        productoById
    });
})

//eliminar un producto
exports.deleteProduct = catchAsyncErrors( async (req, res, next) => {
    const productoById = await producto.findById(req.params.id);
    if (!productoById) {
        return next(new ErrorHandler('Producto no encontrado', 404));
    }

    await productoById.remove();
    
    res.status(200).json({
        success: true,
        message: 'Producto eliminado correctamente',
    });
})

//fetch
function verProductos() {
    fetch('http://localhost:4000/api/productos')
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err));
}

// verProductos();

function verProductoPorId(id) {
    fetch('http://localhost:4000/api/producto/' + id)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err));
}

// verProductoPorId('6346a5fc7bc30d30a7c65598');