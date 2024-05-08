const mongoose = require('mongoose');

const mobilePaymentSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    trim: true
},
  identification: {
    type: String,
    require: true,
    trim: true
},
  phoneNumber: {
    type: String,
    require: true,
    trim: true
},
  amount: {
    type: String,
    require: true,
    trim: true
}
},{
    timestamps: true
});

const MobilePayment = mongoose.model('MobilePayment', mobilePaymentSchema);

module.exports = MobilePayment;