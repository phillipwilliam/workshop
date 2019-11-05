import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from './TextInput';
import { Button } from './Button';

const Entry = ({ id, key, value }) => (
    <div className="row">
        <div className="column">
            <label htmlFor={`${id}-key`}>Key</label>
            <TextInput value={key} id={`${id}-key`} />
        </div>
        <div className="column">
            <label htmlFor={`${id}-value`}>Value</label>
            <TextInput value={value} id={`${id}-value`} />
        </div>
        <div className="column">
            <Button className="remove"><span>remove</span></Button>
        </div>
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