import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchWalletsApi } from './api';
import { FETCH_WALLETS } from './constants';
import { fetchWalletsSuccess, fetchWalletsFailure } from './actions';

export function* fetchWalletsSaga() {
    try {
        const response = yield call(fetchWalletsApi);

        yield put(fetchWalletsSuccess(response.wallets));
    } catch (error) {
        yield put(fetchWalletsFailure(error));
    }
};

export default function* walletsWatcher() {
    yield takeLatest(FETCH_WALLETS, fetchWalletsSaga);
};
