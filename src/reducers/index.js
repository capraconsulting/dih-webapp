import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authenticationReducer from './authentication';
import accountReducer from './account';
import userReducer from './users';
import destinationReducer from './destinations';
import emailReducer from './email';
import messageReducer from './message';
import notificationReducer from './notification';
import tripReducer from './trips';
import adminValuesReducer from './adminValues';

export default combineReducers({
    accountState: accountReducer,
    destinationState: destinationReducer,
    userState: userReducer,
    notificationState: notificationReducer,
    tripState: tripReducer,
    emailState: emailReducer,
    messageState: messageReducer,
    form: formReducer,
    authenticationState: authenticationReducer,
    adminValuesState: adminValuesReducer
});
