import { connect } from 'react-redux';
import { getWalletsData } from './../../containers/Wallets/selector';
import { fetchWallets, resetWallets } from './../../containers/Wallets/actions';
import { getExchangeBaseCurrency, getExchangeRates, getExchangeFrom, getExchangeTo } from './../../containers/Exchange/selector';
import { fetchExchangeRates, resetExchangeRates, changeExchangeFromAmount, changeExchangeToAmount } from './../../containers/Exchange/actions';
import Exchange from './../../components/Exchange';

const mapStateToProps = (state) => {
    return {
        wallets: getWalletsData(state),
        baseCurrency: getExchangeBaseCurrency(state),
        rates: getExchangeRates(state),
        from: getExchangeFrom(state),
        to: getExchangeTo(state)
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
        resetExchangeRates: () => {
            dispatch(resetExchangeRates());
        },
        changeExchangeFromAmount: (amount) => {
            dispatch(changeExchangeFromAmount(amount));
        },
        changeExchangeToAmount: (amount) => {
            dispatch(changeExchangeToAmount(amount));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Exchange);
