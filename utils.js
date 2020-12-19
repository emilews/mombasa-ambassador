import { GetDatabaseInfo } from './database';

export const TransformPriceToBCH = (usd_price) =>{
    let bch_data = GetDatabaseInfo({ticker: "BCH"})("crypto");
    return (usd_price)/bch_data.usd_price;
}