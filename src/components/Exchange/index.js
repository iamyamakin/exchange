import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map, List } from 'immutable';
import { getCrossRate } from './../../utils/convert';
import { findAmountWalletByCurrency } from './../../utils/find';
import Button from './../Button';
import ExchangeHeader from './../ExchangeHeader';
import ExchangeBox from './../ExchangeBox';
import './index.css';

class Exchange extends Component {
    constructor(props) {
        super(props);
        this._onClickClear = this._onClickClear.bind(this);
        this._onClickExchange = this._onClickExchange.bind(this);
        this._onChangeFromAmount = this._onChangeFromAmount.bind(this);
        this._onChangeToAmount = this._onChangeToAmount.bind(this);

        window.setInterval(this.props.fetchExchangeRates, 10000);
    }

    componentWillMount() {
        const { fetchWallets, fetchExchangeRates, from, to } = this.props;

        this._fromCurrency = from.get('currency');
        this._toCurrency = to.get('currency');
        fetchWallets();
    }

    componentWillUnmount() {
        this.props.resetWallets();
        this.props.resetExchange();
    }

    _onClickClear() {
        this.props.resetExchange();
    }

    _onClickExchange() {
        this.props.exchange(Map({
            from: this.props.from,
            to: this.props.to
        }));
    }

    _onChangeFromAmount(amount) {
        this.props.changeExchangeFrom(this.props.from.set('amount', Number(amount)));
    }

    _onChangeToAmount(amount) {
        this.props.changeExchangeTo(this.props.to.set('amount', Number(amount)));
    }

    render() {
        const {
            wallets, baseCurrency, rates, from, to, isEqualCurrencies, hasAmount, hasOverflow, changeWallet
        } = this.props;
        const fromCurrency = from.get('currency');
        const fromAmount = from.get('amount');
        const fromInWallet = findAmountWalletByCurrency(wallets, fromCurrency);
        const toCurrency = to.get('currency');
        const toAmount = to.get('amount');
        const toInWallet = findAmountWalletByCurrency(wallets, toCurrency);
        const crossRate = getCrossRate(rates, fromCurrency, toCurrency).toFixed(4).replace(/\.0+$/, '');
        const meta = !isEqualCurrencies ? `1 ${toCurrency} = ${crossRate} ${fromCurrency}` : '';

        return (
            <section className="exchange-page">
                <ExchangeHeader>
                    <Button onClick={this._onClickClear} disabled={!hasAmount}>Clear</Button>
                    <Button onClick={this._onClickExchange} disabled={isEqualCurrencies || !hasAmount || hasOverflow}>
                        Exchange
                    </Button>
                </ExchangeHeader>
                <ExchangeBox type="from" currency={fromCurrency} amount={fromAmount} wallets={wallets}
                    inWallet={fromInWallet}
                    onChange={this._onChangeFromAmount}
                    changeWallet={changeWallet}
                />
                <ExchangeBox type="to" currency={toCurrency} amount={toAmount} wallets={wallets}
                    inWallet={toInWallet}
                    meta={meta}
                    onChange={this._onChangeToAmount}
                    changeWallet={changeWallet}
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
    resetExchange: PropTypes.func,
    exchange: PropTypes.func,
    changeExchangeFrom: PropTypes.func,
    changeExchangeTo: PropTypes.func,
    changeWallet: PropTypes.func
};

Exchange.defaultProps = {
    wallets: List(),
    rates: Map(),
    from: Map(),
    to: Map(),
    error: '',
    isLoading: false
};

export default Exchange;
