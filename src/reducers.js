import { combineReducers } from 'redux-immutable';
import app from './containers/App/reducer';
import wallets from './pages/Wallets/reducer';
import exchange from './pages/Exchange/reducer';

const reducers = combineReducers({
    global: app,
    wallets,
    exchange
});

export default reducers;
