const got = require('got');
export const GetLatestCryptoPage = (crypto_name) => {
    return BaseFetch(`https://coinmarketcap.com/currencies/${crypto_name.split(" ").join("").toLowerCase()}/`);
}
export const GetLatestFiatPage = (fiat_ticker) => {
    return BaseFetch(`https://www.xe.com/es/currencyconverter/convert/?Amount=1&From=USD&To=${fiat_ticker.toUpperCase()}`)
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