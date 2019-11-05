import React, { forwardRef } from 'react'
import PropTypes from 'prop-types';
import '../css/input.css';

const TextInput = forwardRef(({ id, value, placeholder }, ref) => (
    <input className="text" type="text" ref={ref} id={id} value={value} placeholder={placeholder} />
));

TextInput.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    ref: PropTypes.oneOfType([
        PropTypes.func, 
        PropTypes.shape({ current: PropTypes.any })
    ])
}

TextInput.defaultProps = {
    value: null,
    placeholder: null,
    ref: null
}

export {
    TextInput
}