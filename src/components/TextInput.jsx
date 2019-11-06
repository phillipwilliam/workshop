import React, { forwardRef } from 'react'
import PropTypes from 'prop-types';
import '../css/input.css';

const TextInput = forwardRef(({ id, value, placeholder, onChange }, ref) => (
    <input
        className="text"
        type="text"
        id={id}
        ref={ref}
        value={value}
        onChange={({ target: { value }}) => onChange(value)}
        placeholder={placeholder}
    />
));

TextInput.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    ref: PropTypes.oneOfType([
        PropTypes.func, 
        PropTypes.shape({ current: PropTypes.any })
    ])
}

TextInput.defaultProps = {
    id: null,
    value: '',
    placeholder: null
}

export {
    TextInput
}