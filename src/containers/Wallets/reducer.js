import { Map, List, fromJS } from 'immutable';
import {
    FETCH_WALLETS,
    FETCH_WALLETS_SUCCESS,
    FETCH_WALLETS_FAILURE,
    RESET_WALLETS,
    UPDATE_WALLETS,
    UPDATE_WALLETS_SUCCESS
} from './constants';

const initialState = Map({
    data: List(),
    error: '',
    isLoading: false
});

const walletsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_WALLETS: {
            return state
                .set('error', '')
                .set('isLoading', true);
        }
        case FETCH_WALLETS_SUCCESS: {
            return state
                .set('data', fromJS(action.data))
                .set('error', '')
                .set('isLoading', false);
        }
        case FETCH_WALLETS_FAILURE: {
            return state
                .set('error', action.error)
                .set('isLoading', false);
        }
        case RESET_WALLETS: {
            return initialState;
        }
        case UPDATE_WALLETS: {
            return state;
        }
        case UPDATE_WALLETS_SUCCESS: {
            return state.set('data', action.data);
        }
        default: {
            return state;
        }
    }
};

export default walletsReducer;
