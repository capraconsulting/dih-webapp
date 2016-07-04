import * as types from '../actions/actionTypes';

const initialState = {
    isFetching: false,
    destinations: []
};

export default function (state = initialState, action) {
    switch (action.type) {
    case types.GET_DESTINATIONS_REQUEST:
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
    case types.GET_DESTINATIONS_FAILURE:
        return {
            ...state,
            isFetching: false
        };
    default:
        return state;
    }
}
