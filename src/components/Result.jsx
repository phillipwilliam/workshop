import React, { Fragment } from 'react';
import { TextInput } from './TextInput';

const Result = ({ data }) => (
    data ? (
        <div className="result">
            <Fragment>
            <h3>Output from api</h3>
            {
                Object.entries(data).map(([key, value]) => (
                    <div key={key}>{key}: <TextInput value={value} /></div>
                ))
            }
            </Fragment>
        </div>
    ) : null
);

export {
    Result
};