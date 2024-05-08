const indexCtrl = {};
const Product = require('../models/product.schema')

// Rutas para la página principal de los clientes
indexCtrl.renderIndex = async (req, res) => {
    try {
        const products = await Product.find({});
        const isAdmin = req.session.user ? req.session.user.role === 'admin' : false;
        res.render('home/homepage', { products, isAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
};

indexCtrl.renderAbout = (req, res) => {
    const isAdmin = req.session.user ? req.session.user.role === 'admin' : false;
    res.render('home/about', { isAdmin });
}

indexCtrl.renderEdit = (req, res) => {
    const isAdmin = req.session.user ? req.session.user.role === 'admin' : false;
    res.render('home/contact', { isAdmin });
}

module.exports = indexCtrl;