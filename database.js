const mongoose = require('mongoose');
const { Crypto, Fiat } = require('./models');
const { GetCachedBCHPrice } = require('./utils');
mongoose.connect('mongodb://localhost:27017/mombasa', {useNewUrlParser: true,  useUnifiedTopology: true});

const SaveData = (data) => (kind) => {
    if(kind === 'fiat') {
        Fiat.exists({ fiat_ticker: data.ticker}, (err, doc) => {
            if(err){
                console.log(err);
            }else{
                if(doc){
                    Fiat.updateOne({fiat_ticker: data.ticker}, { $set: { price: data.price }}, {multi: false}, (err, numAffected) => {
                        if(err){
                            console.log(err);
                        }else{
                            console.log(`Found ${numAffected.n} fiat records. With ${numAffected.nModified} affected.`)
                        }
                    });
                }else{
                    let fiat = new Fiat({fiat_ticker: data.ticker, price: data.price});
                    fiat.save();
                }
            }
        })
    }else{
        Crypto.exists({ ticker: data.ticker}, (err, doc) => {
            if(err){
                console.log(err);
            }else{
                if(doc){
                    Crypto.updateOne({ticker: data.ticker}, { $set: { last_update: new Date().toISOString(), bch_price: (data.ticker === "BCH" ? 1 : data.price/GetCachedBCHPrice()), usd_price: data.price }}, {multi: false}, (err, numAffected) => {
                        if(err){
                            console.log(err);
                        }else{
                            console.log(`Found ${data.ticker} crypto record. New price: ${data.price}`)
                        }
                    });
                }else{
                    let crypto = new Crypto({ticker: data.ticker, last_update: new Date().toISOString(), bch_price: (data.ticker === "BCH" ? 1 : data.price/GetCachedBCHPrice()), usd_price: data.price});
                    crypto.save();
                }
            }
        })
    }
}

const GetDatabaseInfo = (data) => (kind) => {
    let res;
    if(kind === 'fiat') {
        Fiat.findOne({fiat_ticker: data.ticker }, function (err, fiat){
            res = fiat;
        });
    }else {
        Crypto.findOne({ticker: data.ticker }, function (err, crypto){
            if(err){
                console.log(err)
            }else{
                res = crypto;
            }
        });
    }
}

const TransformPriceToBCH = async (usd_price) =>{
    let bch_info = GetDatabaseInfo({ticker: "BCH"})("crypto");
    return usd_price/bch_info.usd_price;
}


module.exports = { GetDatabaseInfo, SaveData}