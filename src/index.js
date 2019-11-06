import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Content } from './containers/Content';
import { store } from './redux/store';
import './css/base.css';

ReactDOM.render(
    <Content />,
    <Provider store={store}>
        <Content />
    </Provider>,
    document.getElementById('root')
);