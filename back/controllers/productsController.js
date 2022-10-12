const producto = require('../models/products');
const fetch = (url) => import('node-fetch').then(({ default: fetch }) => fetch(url));

//ver la lista de productos
exports.getProducts = async(req, res, next) => {

    const productos = await producto.find();

    res.status(200).json({
        success: true,
        count: productos.length,
        productos
    });
}

//buscar producto by id
exports.getProductById = async (req, res, next) => {
    
    const productoById = await producto.findById(req.params.id);
    if (!productoById) {
        return res.status(404).json({
            success: false,
            message: `Producto con id ${req.params.id} no existe`
        })
    }

    res.status(200).json({
        success: true,
        productoById
    })
}

//Crear nuevo producto
exports.newProduct = async (req, res, next) => {
    const product = await producto.create(req.body);

    res.status(201).json({
        success: true,
        product
    });
}

//update un producto
exports.updateProduct = async (req, res, next) => {
    let productoById = await producto.findById(req.params.id);
    if (!productoById) {
        return res.status(404).json({
            success: false,
            message: `Producto con id ${req.params.id} no existe`
        });
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
}

//eliminar un producto
exports.deleteProduct = async (req, res, next) => {
    const productoById = await producto.findById(req.params.id);
    if (!productoById) {
        return res.status(404).json({
            success: false,
            message: `Producto con id ${req.params.id} no existe`
        });
    }

    await productoById.remove();
    
    res.status(200).json({
        success: true,
        message: 'Producto eliminado correctamente',
    });
}

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