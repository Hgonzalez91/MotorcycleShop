require('dotenv').config();

const HOST = 'http://localhost:' + process.env.PORT;
const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT;
const PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET;
const PAYPAL_API = 'https://api-m.sandbox.paypal.com';

module.exports = {
    HOST,
    PAYPAL_API_CLIENT,
    PAYPAL_API_SECRET,
    PAYPAL_API
}
