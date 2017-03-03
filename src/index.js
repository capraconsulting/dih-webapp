import outdatedBrowser from 'outdated-browser-rework';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import router from './router.jsx';
import store from './store';
import 'outdated-browser-rework/outdated-browser-rework.scss';

if (!__DEV__) {
    require('raven-js')
        .config(process.env.RAVEN_DSN, {
            release: process.env.VERSION,
            tags: {
                environment: process.env.NODE_ENV
            }
        })
        .install();
}

outdatedBrowser({
    browserSupport: {
        Chrome: 37,
        IE: 10,
        Safari: 7,
        'Mobile Safari': 7,
        Firefox: 32
    }
});

const rootElement = document.getElementById('app');

render(
    <Provider store={store}>
        {router}
    </Provider>,
    rootElement
);
