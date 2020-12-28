const got = require('got');
const GetLatestCryptoPage = (crypto_name) => {
    return BaseFetch(`https://coinmarketcap.com/currencies/${crypto_name.split(" ").join("-").toLowerCase()}/`);
}
const GetLatestBCHPage = () => {
    return BaseFetch(`https://coinmarketcap.com/currencies/bitcoin-cash/`);
}
const GetLatestFiatPage = (fiat_ticker) => {
    return BaseFetch(`https://www.marketwatch.com/investing/currency/usd${fiat_ticker.toLowerCase()}`);
}

const GetLatestCryptoFile = () => {
    return BaseFetch('https://raw.githubusercontent.com/emilews/mombasa-papers/master/crypto.json');
}
const GetLatestFiatFile = () => {
    return BaseFetch('https://raw.githubusercontent.com/emilews/mombasa-papers/master/fiat.json');
}

const BaseFetch = async (uri) => {
    let response = null;
    try {
        response = await got(uri);
    } catch (error) {
        console.log(error.response.body);
    }
    return response;
}

module.exports = {GetLatestCryptoFile, GetLatestFiatFile, GetLatestFiatPage, GetLatestCryptoPage, GetLatestBCHPage }