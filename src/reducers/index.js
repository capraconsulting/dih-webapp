import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import destinationReducer from './destinations';

export default combineReducers({
    destinationState: destinationReducer,
    form: formReducer
});
