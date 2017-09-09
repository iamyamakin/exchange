import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import classNames from 'classnames';
import { debounce, trim } from 'lodash';
import './index.css';

class Input extends Component {
    constructor(props) {
        super(props);
        this._inputControl = null;
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onChange = this._onChange.bind(this);
        this._focus = this._focus.bind(this);
        this._blur = this._blur.bind(this);
        this._debounceOnChange = debounce(
            this.props.onChange,
            this.props.delay
        );
        this.state = {
            data: Map({
                value: this.props.value,
                focused: this.props.focused,
                hasValue: Boolean(this.props.value)
            })
        };
    }

    componentDidMount() {
        this.state.data.get('focused') ? this._focus() : this._blur();
    }

    componentDidUpdate() {
        this.state.data.get('focused') ? this._focus() : this._blur();
    }

    _validate(value) {
        let minLength = this.props.minLength;
        let maxLength = this.props.maxLength;
        let inBoundaries = value.length >= minLength && value.length <= maxLength;
        let isValid = false;

        if (value.length === 0) {
            isValid = true;
        } else if (inBoundaries) {
            isValid = this.props.pattern.test(value);
        }

        return isValid;
    }

    _onFocus(event) {
        if (this.props.disabled) {
            event.preventDefault();
        } else {
            this.setState(
                ({ data: oldData }) => {
                    return {
                        data: oldData.set('focused', true)
                    };
                },
                () => {
                    this.props.onFocus(this.state.data.get('value'));
                }
            );
        }
    }

    _onBlur(event) {
        if (this.props.disabled) {
            event.preventDefault();
        } else {
            this.setState(
                ({ data: oldData }) => {
                    return {
                        data: oldData.set('focused', false)
                    };
                },
                () => {
                    this.props.onBlur(this.state.data.get('value'));
                }
            );
        }
    }

    _onChange(event) {
        let value = trim(event.target.value);

        if (this.props.disabled) {
            event.preventDefault();
        } else {
            if (value.length === 0) {
                this._debounceOnChange.cancel();
            }
            if (this._validate(value)) {
                this.setState(
                    ({ data: oldData }) => {
                        return {
                            data: oldData
                                .set('value', value)
                                .set('hasValue', Boolean(value))
                        };
                    },
                    () => {
                        this._debounceOnChange(this.state.data.get('value'));
                    }
                );
            }
        }
    }

    _focus() {
        this._inputControl.focus();
    }

    _blur() {
        this._inputControl.blur();
    }

    render() {
        const { data } = this.state;
        const hasValue = data.get('hasValue');
        const focused = data.get('focused');
        const { className, type, width, disabled, hidden, align } = this.props;

        const computedClassName = classNames(
            'input',
            {
                [`input_type_${type}`]: type,
                [`input_width_${width}`]: width,
                ['input_state_focused']: focused,
                ['input_state_disabled']: disabled,
                ['input_state_hidden']: hidden,
                ['input_has_value']: hasValue,
                [`input_align_${align}`]: align
            },
            className
        );

        return (
            <span className={computedClassName} onClick={this._onClick}>
                <span className="input__box">
                    <span className="input__placeholder">
                        {this.props.placeholder}
                    </span>
                    <input
                        className="input__control"
                        ref={ref => (this._inputControl = ref)}
                        type={this.props.type}
                        value={this.state.data.get('value')}
                        name={this.props.name}
                        minLength={this.props.minLength}
                        maxLength={this.props.maxLength}
                        onFocus={this._onFocus}
                        onBlur={this._onBlur}
                        onChange={this._onChange}
                    />
                </span>
            </span>
        );
    }
}

Input.propTypes = {
    align: PropTypes.oneOf(['left', 'right']),
    className: PropTypes.string,
    delay: PropTypes.number,
    disabled: PropTypes.bool,
    focused: PropTypes.bool,
    hidden: PropTypes.bool,
    maxLength: PropTypes.number,
    minLength: PropTypes.number,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    pattern: PropTypes.any,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(['text']),
    value: PropTypes.any,
    width: PropTypes.oneOf(['full'])
};

Input.defaultProps = {
    align: 'left',
    delay: 250,
    disabled: false,
    focused: false,
    hidden: false,
    maxLength: 100,
    minLength: 0,
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    pattern: /.*/,
    type: 'text',
    value: ''
};

export default Input;
