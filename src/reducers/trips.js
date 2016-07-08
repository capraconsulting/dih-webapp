import * as actionTypes from '../actions/actionTypes/tripActionTypes';

const initialState = {
    isFetching: false,
    trips: [],
    tripsForDestination: []
};

export default function (state = initialState, action) {
    switch (action.type) {
    case actionTypes.GET_TRIPS_REQUEST:
        return {
            ...state,
            isFetching: true
        };
    case actionTypes.GET_TRIPS_SUCCESS:
        return {
            ...state,
            isFetching: false,
            trips: action.res
        };
    case actionTypes.GET_TRIPS_FAILURE:
        return {
            ...state,
            isFetching: false
        };
    case actionTypes.GET_TRIPS_FOR_DESTINATION_REQUEST:
        return {
            ...state,
            isFetching: true
        };
    case actionTypes.GET_TRIPS_FOR_DESTINATION_SUCCESS:
        return {
            ...state,
            tripsForDestination: action.res,
            isFetching: false
        };
    case actionTypes.GET_TRIPS_FOR_DESTINATION_FAILURE:
        return {
            ...state,
            isFetching: false
        };
    default:
        return state;
    }
}
