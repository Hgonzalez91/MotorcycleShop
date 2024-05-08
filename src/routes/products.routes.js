const { Router } = require('express');
const router = Router();
const multer = require('multer')
const { 
    renderProductForm, 
    createNewProduct, 
    renderProducts, 
    getProductById,
    renderEditForm, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/products.controller')

const {isAuthenticated} = require('../helpers/auth');

// Configura Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads'); // Carpeta de destino para guardar los archivos
    },
    filename: function (req, file, cb) {
        // Genera un nombre único para el archivo
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

//New Product
router.get('/products/add', isAuthenticated, renderProductForm);

router.post('/products/new-product', isAuthenticated, upload.single('image'), createNewProduct);

//Get Products
router.get('/products', isAuthenticated, renderProducts);

router.get('/products/:id', getProductById);

//Edit Products
router.get('/products/edit/:id', isAuthenticated, renderEditForm);

router.put('/products/edit/:id', isAuthenticated, updateProduct);

//Delete Product
router.delete('/products/delete/:id', isAuthenticated, deleteProduct);

module.exports = router;