import * as actionTypes from '../actions/actionTypes/tripActionTypes';

const initialState = {
    trips: [],
    tripsForDestination: []
};

export default (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.GET_TRIPS_SUCCESS:
        return { ...state, trips: action.trips };
    case actionTypes.GET_TRIPS_FOR_DESTINATION_SUCCESS:
        return { ...state, tripsForDestination: action.trips };
    case actionTypes.GET_TRIPS_FOR_USER_SUCCESS:
        return { ...state, trips: action.trips };
    default:
        return state;
    }
};
