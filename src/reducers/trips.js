import * as types from '../actions/actionTypes';

const initialState = {
    trips: []
};

export default (state = initialState, action) => {
    switch (action.type) {
    case types.GET_TRIPS_SUCCESS:
        return { ...state, trips: action.trips };
    default:
        return state;
    }
};
