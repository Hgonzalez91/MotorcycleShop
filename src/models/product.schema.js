const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    unique: true,
    trim: true
},
  description: {
    type: String,
    require: true,
    trim: true
},
  price: {
    type: String,
    require: true,
},
  category: {
    type: String,
    require: true,
    trim: true
},
  image: {
    type: String,
    require: true
}
},{
    timestamps: true
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;