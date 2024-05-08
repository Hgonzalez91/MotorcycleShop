const productsCtrl = {};
const Product = require('../models/product.schema')

productsCtrl.renderProductForm = (req, res) => {
    const isAdmin = req.session.user ? req.session.user.role === 'admin' : false;
    res.render('products/new-product', { isAdmin });
}

// Método para obtener un solo producto por su ID
productsCtrl.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.render('cart/one-product', { product });
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

productsCtrl.createNewProduct = async (req, res) => {
    try {
        const { title, description, price, category } = req.body;
        let imageName = '';
        if (req.file) {
            // Obtener solo el nombre del archivo de la ruta
            imageName = req.file.filename;
        }
        const newProduct = new Product({ title, description, price, category, image: imageName });
        await newProduct.save();
        req.flash('success_msg', 'Product Added Successfully');
        res.redirect('/products');
    } catch (error) {
        console.error('Error adding product:', error);
        req.flash('error', 'Failed to add product');
        res.redirect('/products/new-product');
    }
};

module.exports = productsCtrl;

productsCtrl.renderProducts = async (req, res)=>{
    const products = await Product.find()
    const isAdmin = req.session.user ? req.session.user.role === 'admin' : false;
    res.render('products/all-products', {products, isAdmin});
}

productsCtrl.renderEditForm = async (req, res)=>{
    const product = await Product.findById(req.params.id)
    res.render('products/edit-product', { product });
}

productsCtrl.updateProduct = async (req, res)=>{
    const {title, description, price, category} = req.body
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {title, description, price, category})
    req.flash('success_msg', 'Product Updated Succesfully');
    res.redirect('/products')
}

productsCtrl.deleteProduct = async (req, res)=>{
    const deleteProduct = await Product.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Product Deleted Succesfully');
    res.redirect('/products')
}

module.exports = productsCtrl;