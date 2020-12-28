const mongoose = require('mongoose');


const Crypto = mongoose.model('Crypto', { ticker: String, last_update: String, bch_price: Number, usd_price: Number });

const Fiat = mongoose.model('Fiat', { fiat_ticker: String, price: Number});

module.exports = { Crypto, Fiat };