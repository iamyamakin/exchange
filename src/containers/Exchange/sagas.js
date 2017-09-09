import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchExchangeRatesApi } from './api';
import { FETCH_EXCHANGE_RATES } from './constants';
import { fetchExchangeRatesSuccess, fetchExchangeRatesFailure } from './actions';

export function* fetchExchangeRatesSaga() {
    try {
        const response = yield call(fetchExchangeRatesApi);

        yield put(fetchExchangeRatesSuccess(response));
    } catch (error) {
        yield put(fetchExchangeRatesFailure(error));
    }
};

export default function* exchangeWatcher() {
    yield takeLatest(FETCH_EXCHANGE_RATES, fetchExchangeRatesSaga);
};
