import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.css';

class Button extends Component {
    constructor(props) {
        super(props);
        this._onClick = this._onClick.bind(this);
    }

    _onClick(event) {
        if (this.props.disabled) {
            event.preventDefault();
        } else {
            this.props.onClick(event);
        }
    }

    render() {
        const { children, className, disabled } = this.props;
        const computedClassName = classNames(
            'button',
            {
                [`button_state_disabled`]: disabled
            },
            className
        );

        return (
            <button className={computedClassName} onClick={this._onClick} type="button">
                {children}
            </button>
        );
    }
}

Button.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};

Button.defaultProps = {
    disabled: false,
    onClick: () => {},
};

export default Button;
