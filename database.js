const mongoose = require('mongoose');
import { Crypto, Fiat } from './models';
import { TransformPriceToBCH } from './utils';

mongoose.connect('mongodb://localhost/mombasa', {useNewUrlParser: true});

const SaveData = (data) => (kind) => {
    switch (kind){
        case 'fiat':
            let fiat = new Fiat({fiat_ticker: data.ticker, price: data.price});
            fiat.save();
        case 'crypto':
            let crypto = new Crypto({ticker: data.ticker, last_update: new Date().toISOString(), bch_price: (data.ticker === "BCH" ? 1 : TransformPriceToBCH(data.price)), usd_price: data.price});
            crypto.save();
    }
}

export const GetDatabaseInfo = (data) => (kind) => {
    switch (kind){
        case 'fiat':
            Fiat.find({fiat_ticker: data.fiat_ticker }, (err, fiat) => {
                if (err) {
                    return null;
                } else {
                    return fiat;
                }
            });
        case 'crypto':
            Crypto.find({ticker: data.ticker }, (err, crypto) => {
                if (err) {
                    return null;
                } else {
                    return crypto;
                }
            });
        default:
            //nothing
    }
}
