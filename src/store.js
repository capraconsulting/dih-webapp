import reducers from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import DevTools from './commons/DevTools';
import api from './middleware/api';

export default createStore(
    reducers,
    compose(
        applyMiddleware(thunkMiddleware, api),
        DevTools.instrument()
    )
);
