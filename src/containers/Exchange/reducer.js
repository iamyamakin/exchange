import { Map, fromJS } from 'immutable';
import {
    FETCH_EXCHANGE_RATES,
    FETCH_EXCHANGE_RATES_SUCCESS,
    FETCH_EXCHANGE_RATES_FAILURE,
    RESET_EXCHANGE_RATES,
    CHANGE_EXCHANGE_FROM_AMOUNT,
    CHANGE_EXCHANGE_TO_AMOUNT,
    BASE_CURRENCY
} from './constants';

const initialState = Map({
    data: Map({
        baseCurrency: BASE_CURRENCY,
        rates: Map(),
        from: Map({
            currency: 'USD',
            amount: '0'
        }),
        to: Map({
            currency: 'USD',
            amount: '0'
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
        case RESET_EXCHANGE_RATES: {
            return initialState;
        }
        case CHANGE_EXCHANGE_FROM_AMOUNT: {
            return state.setIn(['data', 'from', 'amount'], action.amount);
        }
        case CHANGE_EXCHANGE_TO_AMOUNT: {
            return state.setIn(['data', 'to', 'amount'], action.amount);
        }
        default: {
            return state;
        }
    }
};

export default exchangeReducer;
