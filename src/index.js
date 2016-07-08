import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import router from './router.jsx';
import store from './store';

const rootElement = document.getElementById('app');

render(
    <Provider store={store}>
        {router}
    </Provider>,
    rootElement
);
