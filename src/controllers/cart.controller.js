const cartCtrl = {};

// Método para obtener el contenido del carrito
cartCtrl.getCart = (req, res) => {
    // Verificar si req.session.cart está definido
    if (req.session.cart) {
        const totalPrice = calculateTotalPrice(req.session.cart);
        const cartProducts = req.session.cart;
        const titles = cartProducts.map(product => product.title);
        req.session.titles = titles;
        req.session.totalPrice = totalPrice;
        console.log(titles);
        res.render('cart/cart', { cart: cartProducts, totalPrice });
    } else {
        // Si req.session.cart no está definido, enviar un carrito vacío a la vista
        res.render('cart/cart', { cart: [], totalPrice: 0 });
    }
};

//Metodo para agregar un producto al carrito
cartCtrl.addToCart = (req, res) => {
    try {
        const { productId, title, description, price, quantity } = req.body;
        req.session.cart = req.session.cart || [];
        const parsedQuantity = parseInt(quantity);
        const productIndex = req.session.cart.findIndex(item => item.productId === productId);
        if (productIndex !== -1) {
            req.session.cart[productIndex].quantity += parsedQuantity;
        } else {
            req.session.cart.push({ productId, title, description, price, quantity: parsedQuantity });
        }
        req.flash('success_msg', 'Product added to cart');
        res.redirect('/cart');
    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
        req.flash('error', 'There is a problem adding your product to the cart');
        res.redirect('/');
    }
};

//Metodo para eliminar un producto del carrito
cartCtrl.removeFromCart = (req, res) => {
    const productIdToRemove = req.body.productId;
    if (!req.session.cart || req.session.cart.length === 0) {
        return res.status(400).json({ message: 'El carrito está vacío' });
    }
    req.session.cart = req.session.cart.filter(cart => cart.productId !== productIdToRemove);
    req.flash('success_msg', 'Product Deleted successfully')
    res.redirect('/cart')
};

// Método para vaciar el carrito
cartCtrl.clearCart = (req, res) => {
    if (!req.session.cart || req.session.cart.length === 0) {
        return res.status(400).json({ message: 'El carrito está vacío' });
    }
    req.session.cart = [];
    req.flash('success_msg', 'All cart has been Deleted successfully')
    res.redirect('/cart'); 
};

// Calcular el precio total del carrito
const calculateTotalPrice = (cart) => {
    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
    });
    return totalPrice;
};

module.exports = cartCtrl;