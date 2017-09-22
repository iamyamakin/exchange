import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { findIndexOfWalletByCurrency } from './../../utils/find';
import { fetchWalletsApi } from './api';
import { FETCH_WALLETS, UPDATE_WALLETS } from './constants';
import { getWalletsData } from './selector';
import { fetchWalletsSuccess, fetchWalletsFailure, updateWalletsSuccess } from './actions';

export function* fetchWalletsSaga() {
    try {
        const response = yield call(fetchWalletsApi);

        yield put(fetchWalletsSuccess(response.wallets));
    } catch (error) {
        yield put(fetchWalletsFailure(error));
    }
};

export function* updateWalletsSaga({ data }) {
    const fromData = data.get('from');
    const toData = data.get('to');
    const wallets = yield select(getWalletsData);
    const indexOfWalletFrom = findIndexOfWalletByCurrency(wallets, fromData.get('currency'));
    const indexOfWalletTo = findIndexOfWalletByCurrency(wallets, toData.get('currency'));
    const walletFrom = wallets.getIn([indexOfWalletFrom, 'amount']);
    const walletTo = wallets.getIn([indexOfWalletTo, 'amount']);

    yield put(updateWalletsSuccess(
        wallets
            .setIn(
                [indexOfWalletFrom, 'amount'],
                walletFrom - fromData.get('amount')
            )
            .setIn(
                [indexOfWalletTo, 'amount'],
                walletTo + toData.get('amount')
            )
    ));
};

export default function* walletsWatcher() {
    yield takeLatest(FETCH_WALLETS, fetchWalletsSaga);
    yield takeLatest(UPDATE_WALLETS, updateWalletsSaga);
};
