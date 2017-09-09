import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from './../Input';
import './index.css';

const ExchangeBox = ({ className, type, currency = 'USD', amount = '0', inWallet = '0', meta, onChange }) => {
    const computedClassName = classNames(
        'exchange-box',
        {
            [`exchange-box_type_${type}`]: type
        },
        className
    );
    const inputOptions = {};
    const inputPattern = /^[-+]?(\d{0,4}|\d{0,4}\.\d{0,2})$/;

    if (amount === '0') {
        inputOptions['placeholder'] = '0';
        inputOptions['value'] = '';
    } else {
        inputOptions['placeholder'] = '';
        inputOptions['value'] = amount;
    }

    return (
        <article className={computedClassName}>
            <div className="exchange-box__container">
                <dl className="exchange-box__row exchange-box__row_size_xxl">
                    <dt className="exchange-box__key exchange-box__currency">{currency}</dt>
                    <dd className="exchange-box__value exchange-box__amount">
                        <Input type="text" onChange={onChange} align="right" pattern={inputPattern} width="full"
                            {...inputOptions}
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
        </article>
    );
};

ExchangeBox.propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(['from', 'to']),
    currency: PropTypes.string,
    amount: PropTypes.string,
    inWallet: PropTypes.string,
    meta: PropTypes.string
};

export default ExchangeBox;
