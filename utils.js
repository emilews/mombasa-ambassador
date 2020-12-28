
let BCH_PRICE = 0;
const GetCachedBCHPrice = () => {
    return BCH_PRICE;
}
const SetCachedBCHPrice = (price) => {
    BCH_PRICE = price;
}

module.exports = { SetCachedBCHPrice, GetCachedBCHPrice };