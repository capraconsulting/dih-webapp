import * as types from '../actions/types/emails';

const initialState = {
    isFetching: false,
    email: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
    case types.GET_EMAIL_REQUEST:
        return {
            ...state,
            isFetching: true
        };
    case types.GET_EMAIL_SUCCESS:
        return {
            ...state,
            isFetching: false,
            email: action.res
        };
    default:
        return state;
    }
}
