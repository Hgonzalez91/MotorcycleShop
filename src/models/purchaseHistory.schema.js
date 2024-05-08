const mongoose = require('mongoose');

const purchaseHistorySchema = new mongoose.Schema({
    
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer' // Nombre del modelo de clientes
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
    }
  },{
    timestamps: true
});

const PurchaseHistory = mongoose.model('PurchaseHistory', purchaseHistorySchema);

module.exports = PurchaseHistory;