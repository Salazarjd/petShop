const express = require('express');
const router = express.Router();

const { getProducts, newProduct, getProductById, updateProduct, deleteProduct } = require('../controllers/productsController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.route('/productos').get(getProducts);

router.route('/producto/nuevo').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);

router.route('/producto/:id').get(getProductById);

router.route('/producto/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct);

router.route('/producto/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

module.exports = router;