import * as types from '../actions/actionTypes';

const initialState = {
    isFetching: false,
    destinations: [],
    destination: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
    case types.GET_DESTINATIONS_REQUEST:
    case types.GET_DESTINATION_REQUEST:
        return {
            ...state,
            isFetching: true
        };
    case types.GET_DESTINATIONS_SUCCESS:
        return {
            ...state,
            isFetching: false,
            destinations: action.res
        };
    case types.GET_DESTINATION_SUCCESS:
        return {
            ...state,
            isFetching: false,
            destination: action.res
        };
    case types.GET_DESTINATIONS_FAILURE:
    case types.GET_DESTINATION_FAILURE:
        return {
            ...state,
            isFetching: false
        };
    default:
        return state;
    }
}
