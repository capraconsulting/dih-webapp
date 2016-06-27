import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import accountReducer from './account';
import destinationReducer from './destinations';

export default combineReducers({
    accountState: accountReducer,
    destinationState: destinationReducer,
    form: formReducer
});
