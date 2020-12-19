const mongoose = require('mongoose');


export const Crypto = mongoose.model('Crypto', { ticker: String, last_update: String, bch_price: Number, usd_price: Number });

export const Fiat = mongoose.model('Fiat', { fiat_ticker: String, price: Number});