// Importa el modelo de PurchaseHistory
const purchaseHis = {}
const PurchaseHistory = require('../models/purchaseHistory.schema');

purchaseHis.getPurchaseHistory = async (req, res) => {
  try {
    const purchaseHistory = await PurchaseHistory.find({ customerId: req.user._id });
    const isAdmin = req.session.user ? req.session.user.role === 'admin' : false;

    // Formatear la fecha de cada compra
    purchaseHistory.forEach(purchase => {
      purchase.formattedDate = purchase.createdAt.toLocaleString();
    });

    res.render('history/purchaseHistory', { purchaseHistory, isAdmin });
  } catch (error) {
    console.error('Error al obtener el historial de compras:', error);
    res.status(500).send('Error interno del servidor');
  }
};

// Controlador para actualizar el estado de pago
purchaseHis.confirmPayment = async (req, res) => {
  try {
      const pagoActualizado = await PurchaseHistory.findByIdAndUpdate(
        req.params.id,
        {paymentStatus: 'Complete'},
        { new: true }
      )
      req.flash('success_msg', 'El pago ha sido confirmado exitosamente');
      res.redirect('/payment/view-payments'); 
  } catch (error) {
      console.error('Error al confirmar el pago:', error);
      req.flash('error_msg', 'Ocurrió un error al confirmar el pago');
      res.redirect('/payment/view-payments'); 
  }
};


module.exports = purchaseHis;