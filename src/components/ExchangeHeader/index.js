import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.css';

const ExchangeHeader = ({ className, type }) => {
    const computedClassName = classNames(
        'exchange-header',
        className
    );

    return (
        <header className={computedClassName}>
        </header>
    );
};

ExchangeHeader.propTypes = {
    className: PropTypes.string,
};

export default ExchangeHeader;
