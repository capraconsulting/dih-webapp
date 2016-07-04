import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authenticationReducer from './authentication';
import accountReducer from './account';
import destinationReducer from './destinations';
import tripReducer from './trips';

export default combineReducers({
    accountState: accountReducer,
    destinationState: destinationReducer,
    tripState: tripReducer,
    form: formReducer,
    authenticationState: authenticationReducer
});
