import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import destinationReducer from './destinations';
import tripReducer from './trips';

export default combineReducers({
    destinationState: destinationReducer,
    tripState: tripReducer,
    form: formReducer
});
