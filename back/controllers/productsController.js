const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const producto = require('../models/products');
const APIFeatures = require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary');
const fetch = (url) => import('node-fetch').then(({ default: fetch }) => fetch(url));

//ver la lista de productos
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
    
    const resPerPage = 4;
    const productsCount = await producto.countDocuments();

    const apiFeatures = new APIFeatures(producto.find(), req.query)
        .search()
        .filter();

    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;
    apiFeatures.pagination(resPerPage);
    products = await apiFeatures.query.clone();

    res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
        filteredProductsCount,
        products
    })

    const productos = await producto.find();
    if (!productos) {
        return next(new ErrorHandler('Productos no encontrados', 404));
    }

    // res.status(200).json({
    //     success: true,
    //     count: productos.length,
    //     productos
    // });
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

//Crear nuevo producto /api/productos
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
    let imagen=[]
    if(typeof req.body.imagen==="string"){
        imagen.push(req.body.imagen)
    }else{
        imagen=req.body.imagen
    }

    let imagenLink=[]

    for (let i=0; i<imagen.length;i++){
        const result = await cloudinary.v2.uploader.upload(imagen[i],{
            folder:"products"
        })
        imagenLink.push({
            public_id:result.public_id,
            url: result.secure_url
        })
    }

    req.body.imagen=imagenLink
    req.body.user = req.user.id;
    const product = await producto.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
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

//crear o actualizar una review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comentario, idProducto } = req.body;

    const opinion = {
        nombreCliente: req.user.nombre,
        rating: Number(rating),
        comentario
    }

    const product = await producto.findById(idProducto);

    const isReviewed = product.opiniones.find(item => item.nombreCliente === req.user.nombre);

    if (isReviewed) {
        product.opiniones.forEach(opinion => {
            if (opinion.nombreCliente === req.user.nombre) {
                opinion.comentario = comentario;
                opinion.rating = rating;
            }
        })
    } else {
        product.opiniones.push(opinion);
        product.numCalificaciones = product.opiniones.length;
    }

    product.calificacion = product.opiniones.reduce((acc, opinion) =>
        opinion.rating + acc, 0) / product.opiniones.length;
    
    
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Hemos opinado correctamente"
    })
})

//ver todas las review de un producto
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await producto.findById(req.query.id);

    res.status(200).json({
        success: true,
        opiniones: product.opiniones
    })
})

//Eliminar review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await producto.findById(req.query.idProducto);

    const opiniones = product.opiniones.filter(opinion =>
        opinion._id.toString() !== req.query.idReview.toString());
    
    const numCalificaciones = opiniones.length;

    const calificacion = product.opiniones.reduce((acc, Opinion) =>
        Opinion.rating + acc, 0) / opiniones.length;

    await producto.findByIdAndUpdate(req.query.idProducto, {
        opiniones,
        calificacion,
        numCalificaciones
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: "review eliminada correctamente"
    })
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

//ver la lista de productos (admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    
    const products = await producto.find();

    res.status(200).json({
        
        products
    })

    // const productos = await producto.find();
    // if (!productos) {
    //     return next(new ErrorHandler('Productos no encontrados', 404));
    // }

    // res.status(200).json({
    //     success: true,
    //     count: productos.length,
    //     productos
    // });
})