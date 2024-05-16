const mongoose = require('mongoose');

const purchaseHistorySchema = new mongoose.Schema({
    
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer' // Nombre del modelo de clientes
    },
    username: {
      type: String,
      required: true
    },
    products: [{
      type: String,
      ref: 'Product'
    }],
    totalPrice: {
      type: Number,
      required: true
    },
    paymentMethod: {
      type: String,
      required: true
    },
    identification: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    amount: {
      type: String,
    },
    paymentStatus: {
      type: String,
      required: true
    },
    createdAt: 
    { 
      type: Date, 
      default: Date.now }
});

const PurchaseHistory = mongoose.model('PurchaseHistory', purchaseHistorySchema);

module.exports = PurchaseHistory;