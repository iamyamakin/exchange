import { createSelector } from 'reselect';

const getExchange = (state) => {
    return state.get('exchange');
};

export const getExchangeData = (state) => {
    return getExchange(state).get('data');
};

export const getExchangeError = (state) => {
    return getExchange(state).get('error');
};

export const getExchangeIsLoading = (state) => {
    return getExchange(state).get('isLoading');
};

export const getExchangeBaseCurrency = (state) => {
    return getExchangeData(state).get('base');
};

export const getExchangeRates = (state) => {
    return getExchangeData(state).get('rates');
};

export const getExchangeFrom = (state) => {
    return getExchangeData(state).get('from');
};

export const getExchangeTo = (state) => {
    return getExchangeData(state).get('to');
};
