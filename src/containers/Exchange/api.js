import request from './../../utils/request';
import { APP_ID, BASE_CURRENCY } from './constants';

// const APP_ID = '41f49319c571476684161aa566dd3dfa';
// const BASE_CURRENCY = 'usd';
// const RATES_REQUEST_URL = `https://openexchangerates.org/api/latest.json?app_id=${APP_ID}&base=${BASE_CURRENCY}`;
const RATES_REQUEST_URL = '/latest.json';

export const fetchExchangeRatesApi = () => request(RATES_REQUEST_URL, {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});
