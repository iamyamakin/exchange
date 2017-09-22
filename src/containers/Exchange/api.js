import request from './../../utils/request';
import { APP_ID, BASE_CURRENCY } from './constants';

const RATES_REQUEST_URL = `https://openexchangerates.org/api/latest.json?app_id=${APP_ID}&base=${BASE_CURRENCY}`;

export const fetchExchangeRatesApi = () => request(RATES_REQUEST_URL, {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});
