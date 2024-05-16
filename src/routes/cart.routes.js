const express = require('express');
const router = express.Router();
const {addToCart, getCart, clearCart, removeFromCart} = require('../controllers/cart.controller');
const { getPurchaseHistory, confirmPayment } = require('../controllers/purchaseHistory.controller');
const { isAuthenticated } = require('../helpers/auth')

// Ruta para obtener el contenido del carrito
router.get('/cart', isAuthenticated, getCart);

// Ruta para agregar un producto al carrito
router.post('/cart/add', isAuthenticated, addToCart);

// Ruta para eliminar un producto del carrito
router.post('/cart/remove', isAuthenticated, removeFromCart);

// Ruta para vaciar el carrito
router.post('/cart/clear', isAuthenticated, clearCart);

//Ruta para ver el historial de compras del usuario
router.get('/cart/purchase-history',isAuthenticated, getPurchaseHistory);

//Ruta para editar el status del pago
router.get('/cart/purchase-edit/:id',isAuthenticated, confirmPayment);

module.exports = router;
