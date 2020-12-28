const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const CRYPTO_PRICE_ELEMENT_TAG = 'cmc-details-panel-price__price';
const FIAT_PRICE_ELEMENT_TAG = 'intraday__price';

const GetCryptoPriceElement = (page) => {
    const cryptoPage = new JSDOM(page.body);

    if(cryptoPage.window.document.querySelector(`span.${CRYPTO_PRICE_ELEMENT_TAG}`) !== null){
        return parseFloat(cryptoPage.window.document.querySelector(`span.${CRYPTO_PRICE_ELEMENT_TAG}`).textContent.split("$")[1].replace(/,/g, ''))
    }else {
        if(cryptoPage.window.document.querySelector(`span.${CRYPTO_PRICE_ELEMENT_TAG}.cmc-detail-price-down-active`) !== null){
            return parseFloat(cryptoPage.window.document.querySelector(`span.${CRYPTO_PRICE_ELEMENT_TAG}.cmc-detail-price-down-active`).textContent.split("$")[1].replace(/,/g, ''));
        }else{
            if(cryptoPage.window.document.querySelector(`span.${CRYPTO_PRICE_ELEMENT_TAG}.cmc-detail-price-up-active`) !== null){
                return parseFloat(cryptoPage.window.document.querySelector(`span.${CRYPTO_PRICE_ELEMENT_TAG}.cmc-detail-price-up-active`).textContent.split("$")[1].replace(/,/g, ''));
            }
        }
    }
}

const GetFiatPriceElement = (page) => {
    const fiatPage = new JSDOM(page.body);
    const data = fiatPage.window.document.querySelector(`h3.${FIAT_PRICE_ELEMENT_TAG}`).textContent.toString().split(" ").filter((item) => {
        return item.search(new RegExp('[0-9]')) === 0;
    });
    return data[0];
}

module.exports = { GetCryptoPriceElement, GetFiatPriceElement };