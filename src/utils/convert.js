export const getCrossRate = (rates, fromCurrency, toCurrency) => {
    return rates.get(fromCurrency) / rates.get(toCurrency);
};

export const convertMoney = ({direction = 'forward', rates, amount, fromCurrency, toCurrency }) => {
    const crossRate = getCrossRate(rates, fromCurrency, toCurrency);
    let convertedMoney;

    switch (String(direction).toLowerCase()) {
        case 'back': {
            convertedMoney = amount * crossRate;
            break;
        }
        case 'forward':
        default: {
            convertedMoney = amount / crossRate;
            break;
        }
    }

    return Number((convertedMoney).toFixed(2).replace(/\.00$/, ''));
};
