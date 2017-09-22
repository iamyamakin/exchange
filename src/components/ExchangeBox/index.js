import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map } from 'immutable';
import classNames from 'classnames';
import Button from './../Button';
import Input from './../Input';
import './index.css';

const ExchangeBox = ({ className, type, currency, amount, wallets, inWallet, meta, onChange, changeWallet }) => {
    const computedClassName = classNames(
        'exchange-box',
        {
            [`exchange-box_type_${type}`]: type
        },
        className
    );
    const inputOptions = {};
    const inputPattern = /^[-+]?(\d+|\d+\.\d{0,2})$/;

    const _changeWalletTo = (direction) => {
        changeWallet(Map({
            direction,
            currency,
            type
        }));
    };

    return (
        <article className={computedClassName}>
            <div className="exchange-box__container">
                <dl className="exchange-box__row exchange-box__row_size_xxl">
                    <dt className="exchange-box__key exchange-box__currency">{currency}</dt>
                    <dd className="exchange-box__value exchange-box__amount">
                        <Input type="text" onChange={onChange} align="right" pattern={inputPattern} width="full"
                            placeholder={0}
                            value={amount ? amount : undefined}
                        />
                    </dd>
                </dl>
                <dl className="exchange-box__row exchange-box__row_theme_grey">
                    <dt className="exchange-box__key">You have {inWallet}</dt>
                    {type === 'to'
                        ? <dd className="exchange-box__value">{meta}</dd>
                        : null}
                </dl>
            </div>
            <div className="exchange-box__actions">
                <Button onClick={_changeWalletTo.bind(null, 'previous')}>Prev</Button>
                <Button onClick={_changeWalletTo.bind(null, 'next')}>Next</Button>
            </div>
        </article>
    );
};

ExchangeBox.propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(['from', 'to']).isRequired,
    currency: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    wallets: ImmutablePropTypes.list.isRequired,
    inWallet: PropTypes.number.isRequired,
    meta: PropTypes.string,
    changeWallet: PropTypes.func
};

export default ExchangeBox;
