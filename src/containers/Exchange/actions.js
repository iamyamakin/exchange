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
    CHANGE_WALLET_SUCCESS
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

export const resetExchange = () => {
    return {
        type: RESET_EXCHANGE
    };
};

export const changeExchangeFrom = (data) => {
    return {
        type: CHANGE_EXCHANGE_FROM,
        data
    };
};

export const changeExchangeFromSuccess = (data) => {
    return {
        type: CHANGE_EXCHANGE_FROM_SUCCESS,
        data
    };
};

export const changeExchangeTo = (data) => {
    return {
        type: CHANGE_EXCHANGE_TO,
        data
    };
};

export const changeExchangeToSuccess = (data) => {
    return {
        type: CHANGE_EXCHANGE_TO_SUCCESS,
        data
    };
};

export const changeWallet = (data) => {
    return {
        type: CHANGE_WALLET,
        data
    };
};

export const changeWalletSuccess = (data) => {
    return {
        type: CHANGE_WALLET_SUCCESS,
        data
    };
};
