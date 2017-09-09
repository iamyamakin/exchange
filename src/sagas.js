import { all, fork } from 'redux-saga/effects';
import app from './containers/App/sagas';
import wallets from './containers/Wallets/sagas';
import exchange from './containers/Exchange/sagas';

export default function* rootSaga() {
    yield all([
        // app,
        wallets,
        exchange,
    ].map(fork));
};
