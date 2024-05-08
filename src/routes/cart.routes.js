const express = require('express');
const router = express.Router();
const {addToCart, getCart, clearCart, removeFromCart} = require('../controllers/cart.controller');
const { getPurchaseHistory } = require('../controllers/purchaseHistory.controller');
const { isInSession, isAuthenticated } = require('../helpers/auth')

// Ruta para obtener el contenido del carrito
router.get('/cart', isAuthenticated, isInSession, getCart, );

// Ruta para agregar un producto al carrito
router.post('/cart/add', isAuthenticated, isInSession, addToCart);

// Ruta para eliminar un producto del carrito
router.post('/cart/remove', isAuthenticated, isInSession, removeFromCart);

// Ruta para vaciar el carrito
router.post('/cart/clear', isAuthenticated, isInSession, clearCart);

//Ruta para ver el historial de compras del usuario
router.get('/cart/purchase-history',isAuthenticated, isInSession, getPurchaseHistory);

module.exports = router;
