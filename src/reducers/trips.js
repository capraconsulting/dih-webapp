import { GET_TRIPS_REQUEST_SUCCESS } from '../actions/actionTypes';

const initialState = {
    trips: []
};

export default (state = initialState, action) => {
    switch (action.type) {
    case GET_TRIPS_REQUEST_SUCCESS:
        return { ...state, trips: action.trips };
    default:
        return state;
    }
};
