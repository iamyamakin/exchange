import {
    FETCH_EXCHANGE_RATES,
    FETCH_EXCHANGE_RATES_SUCCESS,
    FETCH_EXCHANGE_RATES_FAILURE,
    RESET_EXCHANGE_RATES,
    CHANGE_EXCHANGE_FROM_AMOUNT,
    CHANGE_EXCHANGE_TO_AMOUNT
} from './constants';

export const fetchExchangeRates = (data) => {
    return {
        type: FETCH_EXCHANGE_RATES,
        data
    };
};

export const fetchExchangeRatesSuccess = (data) => {
    return {
        type: FETCH_EXCHANGE_RATES_SUCCESS,
        data
    };
};

export const fetchExchangeRatesFailure = (error) => {
    return {
        type: FETCH_EXCHANGE_RATES_FAILURE,
        error
    };
};

export const resetExchangeRates = () => {
    return {
        type: RESET_EXCHANGE_RATES
    };
};

export const changeExchangeFromAmount = (amount) => {
    return {
        type: CHANGE_EXCHANGE_FROM_AMOUNT,
        amount
    };
};

export const changeExchangeToAmount = (amount) => {
    return {
        type: CHANGE_EXCHANGE_TO_AMOUNT,
        amount
    };
};

