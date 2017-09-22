import { call, put, takeLatest, select } from 'redux-saga/effects';
import { convertMoney } from './../../utils/convert';
import { getNextWallet, getPreviousWallet } from './../../utils/get';
import { getWalletsData } from './../../containers/Wallets/selector';
import { fetchExchangeRatesApi } from './api';
import { FETCH_EXCHANGE_RATES, CHANGE_EXCHANGE_FROM, CHANGE_EXCHANGE_TO, CHANGE_WALLET } from './constants';
import {
    getExchangeRates,
    getExchangeFrom,
    getExchangeTo
} from './selector';
import {
    fetchExchangeRatesSuccess,
    fetchExchangeRatesFailure,
    changeExchangeFromSuccess,
    changeExchangeToSuccess,
    updateWalletsSuccess,
    changeWalletSuccess,
    resetExchange
} from './actions';

export function* fetchExchangeRatesSaga() {
    try {
        const response = yield call(fetchExchangeRatesApi);

        yield put(fetchExchangeRatesSuccess(response));
    } catch (error) {
        yield put(fetchExchangeRatesFailure(error));
    }
};

export function* changeExchangeFromSaga({ data }) {
    const exchangeTo = yield select(getExchangeTo);
    const rates = yield select(getExchangeRates);

    yield put(changeExchangeFromSuccess(
        exchangeTo.set(
            'amount',
            convertMoney({
                rates,
                amount: data.get('amount'),
                fromCurrency: data.get('currency'),
                toCurrency: exchangeTo.get('currency')
            })
        )
    ));
};

export function* changeExchangeToSaga({ data }) {
    const exchangeFrom = yield select(getExchangeFrom);
    const rates = yield select(getExchangeRates);

    yield put(changeExchangeToSuccess(
        exchangeFrom.set(
            'amount',
            convertMoney({
                direction: 'back',
                rates,
                amount: data.get('amount'),
                fromCurrency: exchangeFrom.get('currency'),
                toCurrency: data.get('currency')
            })
        )
    ));
};

export function* changeWalletSaga({ data }) {
    const direction = data.get('direction');
    const currency = data.get('currency');
    const type = data.get('type');
    const wallets = yield select(getWalletsData);
    const nextWallet = getNextWallet(wallets, currency);
    const previousWallet = getPreviousWallet(wallets, currency);

    if (direction === 'next') {
        yield put(changeWalletSuccess(nextWallet.merge({type})));
    } else {
        yield put(changeWalletSuccess(previousWallet.merge({type})));
    }
    yield put(resetExchange());
};

export default function* exchangeWatcher() {
    yield takeLatest(FETCH_EXCHANGE_RATES, fetchExchangeRatesSaga);
    yield takeLatest(CHANGE_EXCHANGE_FROM, changeExchangeFromSaga);
    yield takeLatest(CHANGE_EXCHANGE_TO, changeExchangeToSaga);
    yield takeLatest(CHANGE_WALLET, changeWalletSaga);
};
