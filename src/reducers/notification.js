import * as types from '../actions/actionTypes';

const initialState = {
    notification: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
    case types.PUSH_NOTIFICATION:
        return {
            ...state, notification: { message: action.message, level: action.level }
        };
    default:
        return state;
    }
};
