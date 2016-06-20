import { combineReducers } from 'redux';

import destinationReducer from './destinations';

export default combineReducers({
    destinationState: destinationReducer
});
