import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.css';

const ExchangeHeader = ({ className, children }) => {
    const computedClassName = classNames(
        'exchange-header',
        className
    );

    return (
        <header className={computedClassName}>
            {children}
        </header>
    );
};

ExchangeHeader.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
};

export default ExchangeHeader;
