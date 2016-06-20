import * as types from '../actions/actionTypes';

const initialState = {
    destinations: []
};

export default (state = initialState, action) => {
    switch (action.type) {
    case types.ADD_DESTINATION_SUCCESS:
        return state;
    case types.GET_DESTINATIONS_SUCCESS:
        return { ...state, destinations: action.destinations };
    default:
        return state;
    }
};
