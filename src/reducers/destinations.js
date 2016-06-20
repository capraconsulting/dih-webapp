import * as types from '../actions/actionTypes';

const initialState = {
    destinations: []
};

export default (state = initialState, action) => {
    switch (action.type) {
    case types.ADD_DESTINATION_SUCCESS:
        return state;
    default:
        return state;
    }
};
