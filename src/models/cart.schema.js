const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  title: {
    type: String,
},
  description: {
},
  price: {
    type: String,
}
},{
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;