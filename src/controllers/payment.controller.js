const paymentCtrl = {};
const MobilePayment = require('../models/mobilePayment.schema')
const PurchaseHistory = require('../models/purchaseHistory.schema');
const axios = require("axios");
const {
    HOST,
    PAYPAL_API_CLIENT,
    PAYPAL_API_SECRET,
    PAYPAL_API,
} = require("../config.js");

//PAYPAL

paymentCtrl.createOrder = async (req, res) => {
    const order = {
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: req.session.totalPrice,
                }
            },
        ],
        application_context: {
            brand_name: 'EShop',
            landing_page: 'NO_PREFERENCE',
            user_action: 'PAY_NOW',
            return_url: `${HOST}/capture-order`,
            cancel_url: `${HOST}/cancel-order`,
        }
    }

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    const {data: {access_token}} = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
        auth: {
            username: PAYPAL_API_CLIENT,
            password: PAYPAL_API_SECRET
        }
    })

    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
        headers:{
            Authorization: `Bearer ${access_token}`
        }
    })
    return res.json(response.data)
}

paymentCtrl.captureOrder = async (req, res) => {
    const  { token } = req.query
    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
        auth: {
            username: PAYPAL_API_CLIENT,
            password: PAYPAL_API_SECRET
        }
    });

    if (!req.session.cart || req.session.cart.length === 0) {
        return res.status(400).json({ message: 'El carrito está vacío' });
    }
    // Obtener los títulos de los productos de req.session
    req.session.cart = [];
    const titles = req.session.titles;
    const totalPrice = req.session.totalPrice;
    console.log(titles);

    const newPurchase = new PurchaseHistory({
        customerId: req.user._id, // Suponiendo que tienes un usuario autenticado
        products: titles, // Suponiendo que tienes la información de productos en la sesión
        totalPrice: totalPrice,
        paymentMethod: 'PayPal', // o 'Pago Móvil' según el método de pago
    });

    await newPurchase.save();

    req.flash('success_msg', `You're purchase has been completed successfully`)
    res.redirect('/')
}

paymentCtrl.cancelOrder = (req, res) => {
    res.redirect('/')
}

//PAGO MOVIL

paymentCtrl.pagoMovil = (req, res) => {
    res.render('cart/payments/paymentMobile');
};

paymentCtrl.saveMobilePayment =  async (req, res) => {
    try {
        const { username, identification, phoneNumber, amount } = req.body;
        const newPayment = new MobilePayment({
            username,
            identification,
            phoneNumber,
            amount
        });
        await newPayment.save();
        if (!req.session.cart || req.session.cart.length === 0) {
            return res.status(400).json({ message: 'El carrito está vacío' });
        }
        // Obtener los nombres de productos de la sesión
        const titles = req.session.titles;
        const totalPrice = req.session.totalPrice;

        // Crear un nuevo registro en el historial de compras
        const newPurchase = new PurchaseHistory({
            customerId: req.user._id, // Suponiendo que tienes un usuario autenticado
            products: titles, // Suponiendo que tienes la información de productos en la sesión
            totalPrice: totalPrice,
            paymentMethod: 'Pago Móvil', // Indicar el método de pago
        });

        await newPurchase.save();
        req.session.cart = [];
        req.flash('success_msg', `Your data has been saved, wait for a seller to contact you and you're purchase has been completed successfully`)
        res.redirect('/');
    } catch (error) {
        console.error('Error al guardar los datos del pago móvil:', error);
        res.status(500).send('Error interno del servidor');
    }
};

paymentCtrl.getPayments = async (req, res) => {
    try {
        const payments = await MobilePayment.find();
        const isAdmin = req.session.user ? req.session.user.role === 'admin' : false;
        res.render('cart/payments/paymentsList', { payments, isAdmin });
    } catch (error) {
        console.error('Error al obtener los pagos móviles:', error);
        res.status(500).send('Error interno del servidor');
    }
};

paymentCtrl.deletePayment = async (req, res) => {
    const deletePayment = await MobilePayment.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Payment Deleted Succesfully');
    res.redirect('/payment/view-payments')
};

module.exports = paymentCtrl;