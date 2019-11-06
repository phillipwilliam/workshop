## React-Redux

Install these packages to start
```
npm install --save redux react-redux redux-saga
npm install --save-dev redux-devtools-extension
```

### We will update the `Result.jsx` component to use Redux instead of React.useReducer()

#### Create the api reducer
```javascript
// src/redux/api.js
import axios from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';

// Give the actions descriptive names
const API_REQUESTED = 'API_REQUESTED';
const API_FAILED = 'API_FAILED';
const API_SUCCEEDED = 'API_SUCCEEDED';

const defaultState = {
    loading: false,
    error: true,
    data: null
}

// The reducer function will handle 3 actions
const reducer = (state = defaultState, { type, data }) => {
    switch (type) {
        case API_REQUESTED:
            return { ...state, loading: true }
        case API_FAILED:
                return { ...state, loading: false, error: true }
        case API_SUCCEEDED:
            return { ...state, loading: false, data }
        default:
            return state;
    }
}

const actionCreators = {
    apiRequested({ url }) {
        return {
            type: API_REQUESTED,
            url
        };
    },
    apiFailed() {
        return {
            type: API_FAILED
        };
    },
    apiSucceeded({ data }) {
        return {
            type: API_SUCCEEDED,
            data
        };
    }
};

// Generator that will make the api request and dispatches API_FAILED/API_SUCCEEDED
function* apiRequest({ url }) {
    try {
        const { data } = yield call(axios.get, url);
        yield put(actionCreators.apiSucceeded({ data }));
    } catch (error) {
        yield put(actionCreators.apiFailed());
    }
}

// Generator that will watch for the API_REQUESTED action
function* watchForApiRequests() {
    yield takeLatest(API_REQUESTED, apiRequest);
}

export {
    reducer as default,
    actionCreators,
    watchForApiRequests
};
```

```javascript
// src/redux/reducer.js
import { combineReducers } from 'redux';
import api from './api';

export default combineReducers({
    api
});
```

```javascript
// src/redux/sagas.js
import { all } from 'redux-saga/effects';
import { watchForApiRequests } from './api';

export default function* rootSaga() {
    yield all([
        watchForApiRequests()
    ]);
}
```

```javascript
// src/redux/store.js
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(sagas);

export {
    store
};
```

```javascript
// src/containers/Content.jsx
import { connect } from 'react-redux';
import { actionCreators } from '../redux/api';
import { Content as ContentBase } from '../components/Content';

const mapStateToProps = ({ api: { loading, error, data } }) => ({ loading, error, data });

const mapDispatchToProps = dispatch => ({
    getApi: ({ url }) => dispatch(actionCreators.apiRequested({ url }))
});

const Content = connect(mapStateToProps, mapDispatchToProps)(ContentBase);

export {
    Content
};
```

``` javascript
// src/containers/Results.jsx
import { connect } from 'react-redux';
import { Result as ResultBase } from '../components/Result';

const mapStateToProps = ({ api: { data } }) => ({ data });

const Result = connect(mapStateToProps)(ResultBase);

export {
    Result
};
```

```javascript
// src/components/Result.jsx
import React, { Fragment } from 'react';
import { TextInput } from './TextInput';

const Result = ({ data }) => (
    data && (
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
    )
);

export {
    Result
};

```

```javascript
// src/components/Content.jsx
import React from 'react';
import { Section } from './Section';
import { TableRow } from './TableRow';
import { Entry } from './Entry';
import { TextInput } from './TextInput';
import { Result } from '../containers/Result';
import '../css/table.css';

const Content = ({ getApi }) => {
    const [url, setUrl] = React.useState('');

    return (
        <div className="content">
            <h2>Details for accessing the api</h2>

            <Section title="Step 1. Define the API URL">
                <TextInput value={url} onChange={setUrl} placeholder="https://jsonplaceholder.typicode.com/todos/1" />
                <h3>Your URL is made up of these parts</h3>
                <p>Indicate which parts of the url will be controlled by the user using the buttons below.</p>
                <table>
                    <TableRow>
                        <th>Url piece</th>
                        <th>User editable</th>
                        <th>Details</th>
                    </TableRow>
                    <TableRow>
                        <td>/api</td>
                        <td><input type="checkbox" /></td>
                        <td></td>
                    </TableRow>
                    <TableRow>
                        <td>/v1</td>
                        <td><input type="checkbox" /></td>
                        <td></td>
                    </TableRow>
                </table>
            </Section>

            <Section title="Step 2. Define any custom headers">
                <h4>Current headers</h4>
                <Entry id="1" label="app_id" value="/api" />
                <Entry id="2" label="app_key" value="753453453ae4234345" />
            </Section>

            <button type="button" className="connect" onClick={() => getApi({ url })}>
                Connect to API
            </button>

            <Result />
        </div>
    )
};

export { Content };
```

Run this to start the application
```
npm start
```
