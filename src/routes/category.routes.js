const { Router } = require('express');
const { renderByCategory } = require('../controllers/category.controller')
const router = Router();

router.get('/category/cascos', renderByCategory('Cascos'));
router.get('/category/guantes', renderByCategory('Guantes'));
router.get('/category/maletas', renderByCategory('Maletas'));
router.get('/category/visores', renderByCategory('Visores'));
router.get('/category/mascaras', renderByCategory('Mascaras'));
router.get('/category/cauchos', renderByCategory('Caucho'));
router.get('/category/bolsos', renderByCategory('Bolsos'));
router.get('/category/candados', renderByCategory('Candados'));

module.exports = router;