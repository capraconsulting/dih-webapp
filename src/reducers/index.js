import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import accountReducer from './account';
import destinationReducer from './destinations';
import notificationReducer from './notification';
import tripReducer from './trips';

export default combineReducers({
    accountState: accountReducer,
    destinationState: destinationReducer,
    notificationState: notificationReducer,
    tripState: tripReducer,
    form: formReducer
});
