import * as types from '../actions/actionTypes';

const initialState = {
    isFetching: false,
    trips: []
};

export default function (state = initialState, action) {
    switch (action.type) {
    case types.GET_TRIPS_REQUEST:
        return {
            ...state,
            isFetching: true
        };
    case types.GET_TRIPS_SUCCESS:
        return {
            ...state,
            isFetching: false,
            trips: action.res
        };
    case types.GET_TRIPS_FAILURE:
        return {
            ...state,
            isFetching: false
        };
    default:
        return state;
    }
}
