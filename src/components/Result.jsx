import React, { Fragment, useContext, useReducer } from 'react';
import axios from 'axios';
import { GonContext } from './Content';
import { TextInput } from './TextInput';

const reducer = (state, { type, data }) => {
    switch (type) {
        case "LOADING":
            return { ...state, loading: true }
        case "FAILED":
                return { ...state, loading: false, error: true }
        case "RECEIVED":
            return { ...state, loading: false, data }
        default:
            throw new Error();
    }
}

const Result = () => {
    const url = React.useContext(GonContext);
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        error: true,
        data: null
    });

    React.useEffect(() => {
        const getData = async (url) => {
            dispatch({ type: "LOADING" })
            try {
                const { data } = await axios.get(url);
                dispatch({ type: "RECEIVED", data })
            } catch {
                dispatch({ type: "LOADING" })
            }
        }
        url && getData(url);
    }, [url]);

    return (
        <div className="result">
            { state.loading && 'Loading...' }
            { state.data && (
                <Fragment>
                <h3>Result</h3>
                {
                    Object.entries(state.data).map(([key, value]) => (
                        <div key={key}>{key}: <TextInput value={value} /></div>
                    ))
                }
                </Fragment>
            )}
        </div>
    )
};

export {
    Result
};