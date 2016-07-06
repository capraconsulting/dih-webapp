import * as types from '../actions/types/users';

const initialState = {
    isFetching: false,
    users: [],
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
    case types.GET_USER_REQUEST:
    case types.GET_USERS_REQUEST:
        return {
            ...state,
            isFetching: true
        };
    case types.GET_USERS_SUCCESS:
        return {
            ...state,
            isFetching: false,
            users: action.res
        };
    case types.GET_USER_SUCCESS:
        return {
            ...state,
            isFetching: false,
            user: action.res
        };
    case types.GET_USER_FAILURE:
    case types.GET_USERS_FAILURE:
        return {
            ...state,
            isFetching: false
        };
    default:
        return state;
    }
}
