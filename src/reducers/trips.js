import * as actionTypes from '../actions/types/trips';

const initialState = {
    isFetching: false,
    trip: {
        destination: {},
        user: {}
    },
    trips: []
};

export default function (state = initialState, action) {
    switch (action.type) {
    case actionTypes.GET_TRIP_REQUEST:
    case actionTypes.GET_TRIPS_REQUEST:
    case actionTypes.GET_TRIPS_FOR_USER_REQUEST:
        return {
            ...state,
            isFetching: true
        };
    case actionTypes.GET_TRIP_FAILURE:
    case actionTypes.GET_TRIPS_FAILURE:
    case actionTypes.GET_TRIPS_FOR_USER_FAILURE:
        return {
            ...state,
            isFetching: false
        };
    case actionTypes.GET_TRIP_SUCCESS:
        const newState = {
            ...state,
            isFetching: false,
            trip: action.res
        };
        if (!newState.trip.destination) newState.trip.destination = {};
        if (!newState.trip.user) newState.trip.user = {};
        return newState;
    case actionTypes.GET_TRIPS_SUCCESS:
        return {
            ...state,
            isFetching: false,
            trips: action.res
        };
    default:
        return state;
    }
}
