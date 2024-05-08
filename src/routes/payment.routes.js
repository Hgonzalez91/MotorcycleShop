const { Router } = require('express');
const {
    createOrder,
    captureOrder,
    cancelOrder,
    pagoMovil,
    saveMobilePayment,
    getPayments,
    deletePayment
} = require('../controllers/payment.controller');
const {isInSession, isAuthenticated} = require('../helpers/auth')

//PAYPAL

const router = Router();

router.post('/create-order', isInSession, createOrder)

router.get('/capture-order', isInSession, captureOrder, )

router.get('/cancel-order', isInSession, cancelOrder)

// PAGO MOVIL

// Ruta para ver el pago movil
router.get('/payment/mobile-payment', isAuthenticated, pagoMovil);

//Ruta para guardar los datos del pagomovil del comprador
router.post('/payment/save', isAuthenticated,  saveMobilePayment)

//Ruta para ver los pagos de los compradores
router.get('/payment/view-payments', isAuthenticated, getPayments)

//Ruta para eliminar el pago de un comprador
router.get('/payment/delete/:id',isAuthenticated, deletePayment)

module.exports = router;