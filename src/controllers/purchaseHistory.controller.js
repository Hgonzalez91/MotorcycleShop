// Importa el modelo de PurchaseHistory
const purchaseHis = {}
const PurchaseHistory = require('../models/purchaseHistory.schema');

purchaseHis.getPurchaseHistory = async (req, res) => {
  try {
    const purchaseHistory = await PurchaseHistory.find({ customerId: req.user._id });
    const isAdmin = req.session.user ? req.session.user.role === 'admin' : false;
    res.render('history/purchaseHistory', { purchaseHistory, isAdmin });
  } catch (error) {
    console.error('Error al obtener el historial de compras:', error);
    res.status(500).send('Error interno del servidor');
  }
};

module.exports = purchaseHis;