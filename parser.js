const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var cachedCryptoPage = null;
var cachedFiatPage = null;
const CRYPTO_PRICE_ELEMENT_TAG = 'cmc-details-panel-price__price';
const FIAT_PRICE_ELEMENT_TAG = 'converterresult-toAmount';

export const ParseCryptoPage = (page) => {
    cachedCryptoPage = new JSDOM(page);
}

export const GetCryptoPriceElement = () => {
    return parseFloat(cachedCryptoPage.window.document.querySelector(`span.${CRYPTO_PRICE_ELEMENT_TAG}`).textContent);
}

export const ParseFiatPage = (page) => {
    cachedFiatPage = new JSDOM(page);
}

export const GetFiatPriceElement = () => {
    return parseFloat(cachedPage.window.document.querySelector(`span.${FIAT_PRICE_ELEMENT_TAG}`).textContent);
}