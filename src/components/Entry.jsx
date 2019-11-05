import React from 'react';
import PropTypes from 'prop-types';

const Entry = ({ id, key, value }) => (
    <div className="row">
        <div className="column">
            <label htmlFor={`${id}-key`}>Key</label>
            <input type="text" value={key} id={`${id}-key`} />
        </div>
        <div className="column">
            <label htmlFor={`${id}-value`}>Value</label>
            <input type="text" value={value} id={`${id}-value`} />
        </div>
        <div className="column"><button type="button" className="remove">remove</button></div>
    </div>
)

Entry.propTypes = {
    id: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
}

export {
    Entry
};