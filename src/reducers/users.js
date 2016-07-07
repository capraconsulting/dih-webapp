import * as types from '../actions/types/users';

const initialState = {
    isFetching: false,
    errorMessage: null,
    successMessage: null,
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
    case types.POST_USER_SUCCESS:
        return {
            ...state,
            isFetching: false,
            errorMessage: null,
            successMessage: `Takk for at du har registrert deg!
            Du skal ha mottat en mail for å fullføre registrerings prosessen!`
        };
    case types.GET_USER_FAILURE:
    case types.GET_USERS_FAILURE:
    case types.POST_USER_FAILURE:
        return {
            ...state,
            isFetching: false,
            successMessage: null,
            errorMessage: action.error
        };
    default:
        return state;
    }
}
