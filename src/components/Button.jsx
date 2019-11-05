import React from 'react'
import PropTypes from 'prop-types';

const Button = ({ className, children }) => (
    <button type="button" className={className}>{children}</button>
);

Button.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired
}

Button.defaultProps = {
    className: null
}

export {
    Button
};