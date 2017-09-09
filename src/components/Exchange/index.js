import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map, List } from 'immutable';
import ExchangeHeader from './../ExchangeHeader';
import ExchangeBox from './../ExchangeBox';
import './index.css';

class Exchange extends Component {
    constructor(props) {
        super(props);
        this._onChangeFromAmount = this._onChangeFromAmount.bind(this);
        this._onChangeToAmount = this._onChangeToAmount.bind(this);
    }

    componentWillMount() {
        const { fetchWallets, fetchExchangeRates, from, to } = this.props;

        this._fromCurrency = from.get('currency');
        this._toCurrency = to.get('currency');
        fetchWallets();
        fetchExchangeRates();
    }

    componentWillUnmount() {
        this.props.resetWallets();
        this.props.resetExchangeRates();
    }

    _findAmountWalletByCurrency(wallets, currency) {
        if (wallets.isEmpty() || !currency.length) {
            return null;
        }

        let findedWallet = wallets.find((wallet) => {
            let walletCurrency = wallet.get('currency');

            if (typeof walletCurrency === 'string') {
                return walletCurrency.toLowerCase() === (currency).toLowerCase();
            }

            return false;
        })

        if (findedWallet && !findedWallet.isEmpty()) {
            return findedWallet.get('amount').toFixed(2);
        }

        return 0;
    }

    _onChangeFromAmount(value) {
        this.props.changeExchangeFromAmount(value);
    }

    _onChangeToAmount(value) {
        this.props.changeExchangeToAmount(value);
    }

    render() {
        const { wallets, baseCurrency, rates, from, to } = this.props;
        const fromCurrency = from.get('currency');
        const fromAmount = from.get('amount');
        const fromInWallet = this._findAmountWalletByCurrency(wallets, fromCurrency);
        const toCurrency = to.get('currency');
        const toAmount = to.get('amount');
        const toInWallet = this._findAmountWalletByCurrency(wallets, toCurrency);
        const meta = fromCurrency !== toCurrency ? `${fromCurrency} = ${toCurrency}` : '';

        return (
            <section className="exchange-page">
                <ExchangeHeader />
                <ExchangeBox type="from" currency={fromCurrency} amount={fromAmount} inWallet={fromInWallet}
                    onChange={this._onChangeFromAmount}
                />
                <ExchangeBox type="to" currency={toCurrency} amount={toAmount} inWallet={toInWallet} meta={meta}
                    onChange={this._onChangeToAmount}
                />
            </section>
        );
    }
}

Exchange.propTypes = {
    wallets: ImmutablePropTypes.list,
    baseCurrency: PropTypes.string,
    rates: ImmutablePropTypes.map,
    from: ImmutablePropTypes.map,
    to: ImmutablePropTypes.map,
    error: PropTypes.string,
    isLoading: PropTypes.bool,
    fetchWallets: PropTypes.func,
    resetWallets: PropTypes.func,
    fetchExchangeRates: PropTypes.func,
    resetExchangeRates: PropTypes.func,
    changeExchangeFromAmount: PropTypes.func,
    changeExchangeToAmount: PropTypes.func
};

Exchange.defaultProps = {
    wallets: List(),
    baseCurrency: 'USD',
    rates: Map(),
    from: Map(),
    to: Map(),
    error: '',
    isLoading: false
};

export default Exchange;
