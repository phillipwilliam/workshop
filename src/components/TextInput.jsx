import React from 'react'
import PropTypes from 'prop-types';
import '../css/input.css';

const TextInput = ({ id, value, placeholder }) => (
    <input className="text" type="text" id={id} value={value} placeholder={placeholder} />
);

TextInput.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string
}

TextInput.defaultProps = {
    value: null,
    placeholder: null
}

export {
    TextInput
}