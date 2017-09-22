import { Map, fromJS } from 'immutable';
import {
    FETCH_EXCHANGE_RATES,
    FETCH_EXCHANGE_RATES_SUCCESS,
    FETCH_EXCHANGE_RATES_FAILURE,
    RESET_EXCHANGE,
    CHANGE_EXCHANGE_FROM,
    CHANGE_EXCHANGE_FROM_SUCCESS,
    CHANGE_EXCHANGE_TO,
    CHANGE_EXCHANGE_TO_SUCCESS,
    CHANGE_WALLET,
    CHANGE_WALLET_SUCCESS,
    BASE_CURRENCY
} from './constants';

const initialState = Map({
    data: Map({
        baseCurrency: BASE_CURRENCY,
        rates: Map(),
        from: Map({
            currency: BASE_CURRENCY,
            amount: 0
        }),
        to: Map({
            currency: BASE_CURRENCY,
            amount: 0
        })
    }),
    error: '',
    isLoading: false
});

const exchangeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EXCHANGE_RATES: {
            return state
                .set('error', '')
                .set('isLoading', true);
        }
        case FETCH_EXCHANGE_RATES_SUCCESS: {
            const data = action.data;

            return state
                .setIn(['data', 'baseCurrency'], data && data.base)
                .setIn(['data', 'rates'], data && fromJS(data.rates))
                .set('error', '')
                .set('isLoading', false);
        }
        case FETCH_EXCHANGE_RATES_FAILURE: {
            return state
                .set('error', action.error)
                .set('isLoading', false);
        }
        case RESET_EXCHANGE: {
            return state
                .setIn(['data', 'from', 'amount'], 0)
                .setIn(['data', 'to', 'amount'], 0);
        }
        case CHANGE_EXCHANGE_FROM: {
            return state.setIn(['data', 'from'], action.data);
        }
        case CHANGE_EXCHANGE_FROM_SUCCESS: {
            return state.setIn(['data', 'to'], action.data);
        }
        case CHANGE_EXCHANGE_TO: {
            return state.setIn(['data', 'to'], action.data);
        }
        case CHANGE_EXCHANGE_TO_SUCCESS: {
            return state.setIn(['data', 'from'], action.data);
        }
        case CHANGE_WALLET: {
            return state;
        }
        case CHANGE_WALLET_SUCCESS: {
            const data = action.data;

            return state.setIn(['data', data.get('type'), 'currency'], data.get('currency'));
        }
        default: {
            return state;
        }
    }
};

export default exchangeReducer;
