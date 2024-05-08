const categoryCtrl = {};
const Product = require('../models/product.schema')

categoryCtrl.renderByCategory = (category) => async (req, res) => {
    try {
        // Busca los productos de la categoría especificada
        const isAdmin = req.session.user ? req.session.user.role === 'admin' : false;
        const products = await Product.find({ category: category });
        res.render('category/category', { category, products, isAdmin });
    } catch (error) {
        console.error('Error al obtener productos por categoría:', error);
        req.flash('error_msg', 'Error al obtener productos');
        res.redirect('/'); // Redirecciona a la página principal en caso de error
    }
};

module.exports = categoryCtrl;