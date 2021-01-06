var schedule = require('node-schedule');
const { GetLatestCryptoFile, GetLatestFiatFile, GetLatestCryptoPage, GetLatestFiatPage, GetLatestBCHPage } = require("./fetcher.js");
const { GetFiatPriceElement, GetCryptoPriceElement } = require('./parser');
const { SaveData } = require('./database');
const { SetCachedBCHPrice, GetCachedBCHPrice } = require('./utils');

const UpdateSourceFiles = async () => {
    const fiats = await GetLatestFiatFile();
    console.log("Updated fiat source file!")
    const fiats_json = JSON.parse(fiats.body);
    const cryptos = await GetLatestCryptoFile();
    console.log("Updated cryptos source file!")
    const cryptos_json = JSON.parse(cryptos.body);
    GetFiatDataFromSourceFiles(fiats_json);
    GetCryptoDataFromSourceFiles(cryptos_json);
}

const GetCryptoDataFromSourceFiles = (cJson) => {
    cJson.core.map(async (cryptoItem) => {
        let cryptoPage = await GetLatestCryptoPage(cryptoItem.name);
        if(cryptoItem.ticker === "BCH"){
            SetCachedBCHPrice(GetCryptoPriceElement(cryptoPage));
            SaveData({ticker: cryptoItem.ticker, price: GetCachedBCHPrice()})('crypto');
        }else{
            SaveData({ticker: cryptoItem.ticker, price: GetCryptoPriceElement(cryptoPage)})('crypto');
        }
    })
    cJson.extras.map(async (cryptoItem) => {
        let cryptoPage = await GetLatestCryptoPage(cryptoItem.name);
        SaveData({ticker: cryptoItem.ticker, price: GetCryptoPriceElement(cryptoPage)})('crypto');
    })
}

const GetFiatDataFromSourceFiles = (fJson) => {
    fJson.core.map(async (item) => {
        if(item.ticker !== "USD"){
            let fiatPage = await GetLatestFiatPage(item.ticker);
            SaveData({ticker: item.ticker, price: GetFiatPriceElement(fiatPage)})('fiat');
        }else{
            SaveData({ticker: "USD", price: 1})('fiat')
        }
    })
    fJson.extras.map(async (item) => {
        let fiatPage = await GetLatestFiatPage(item.ticker);
        SaveData({ticker: item.ticker, price: GetFiatPriceElement(fiatPage)})('fiat');
    })

}

const UpdateMainBCHPrice = async () => {
    let bchPage = await GetLatestBCHPage();
    SaveData({ticker: "BCH", price: GetCryptoPriceElement(bchPage)})('crypto');
}
UpdateMainBCHPrice();

var j = schedule.scheduleJob(' */1 * * * *', function(){
    UpdateSourceFiles();
});
