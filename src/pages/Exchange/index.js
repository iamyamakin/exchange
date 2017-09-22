import { connect } from 'react-redux';
import { findAmountWalletByCurrency } from './../../utils/find';
import { getWalletsData } from './../../containers/Wallets/selector';
import { fetchWallets, resetWallets, updateWallets } from './../../containers/Wallets/actions';
import {
    getExchangeBaseCurrency,
    getExchangeRates,
    getExchangeFrom,
    getExchangeTo,
    isEqualCurrencies,
    hasAmount,
    hasOverflow
} from './../../containers/Exchange/selector';
import {
    fetchExchangeRates,
    resetExchange,
    changeExchangeFrom,
    changeExchangeTo,
    changeWallet
} from './../../containers/Exchange/actions';
import Exchange from './../../components/Exchange';

const mapStateToProps = (state) => {
    const wallets = getWalletsData(state);
    const from = getExchangeFrom(state);

    return {
        wallets,
        baseCurrency: getExchangeBaseCurrency(state),
        rates: getExchangeRates(state),
        from,
        to: getExchangeTo(state),
        isEqualCurrencies: isEqualCurrencies(state),
        hasAmount: hasAmount(state),
        hasOverflow: hasOverflow(state, findAmountWalletByCurrency(wallets, from.get('currency')))
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchWallets: (data) => {
            dispatch(fetchWallets(data));
        },
        resetWallets: () => {
            dispatch(resetWallets());
        },
        fetchExchangeRates: (data) => {
            dispatch(fetchExchangeRates(data));
        },
        resetExchange: () => {
            dispatch(resetExchange());
        },
        exchange: (data) => {
            dispatch(updateWallets(data));
            dispatch(resetExchange());
        },
        changeExchangeFrom: (data) => {
            dispatch(changeExchangeFrom(data));
        },
        changeExchangeTo: (data) => {
            dispatch(changeExchangeTo(data));
        },
        changeWallet: (data) => {
            dispatch(changeWallet(data));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Exchange);
