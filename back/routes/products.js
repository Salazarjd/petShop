const express = require('express');
const router = express.Router();

const { getProducts, newProduct, getProductById, updateProduct, deleteProduct } = require('../controllers/productsController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.route('/productos').get(isAuthenticatedUser, authorizeRoles('admin'), getProducts);

router.route('/producto/nuevo').post(newProduct);

router.route('/producto/:id').get(getProductById);

router.route('/producto/:id').put(updateProduct);

router.route('/producto/:id').delete(deleteProduct);

module.exports = router;