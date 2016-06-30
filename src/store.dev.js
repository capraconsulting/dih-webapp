import { createStore, compose } from 'redux';
import reducers from './reducers';
import DevTools from './commons/DevTools';

const enhancer = compose(
    DevTools.instrument()
);

const store = createStore(reducers, enhancer);

export default store;
