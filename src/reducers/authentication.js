import * as types from '../actions/types/authentication';

const initialState = {
    isFetching: false,
    errorMessage: null,
    successMessage: null,
    isAuthenticated: typeof localStorage.getItem('jwt') === 'string'
};
// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function (state = initialState, action) {
    switch (action.type) {
    case types.POST_LOGIN_REQUEST:
        return {
            ...state,
            isFetching: true,
            isAuthenticated: false,
            credentials: action.credentials
        };
    case types.GET_PASSWORD_SUCCESS:
        return {
            ...state,
            successMessage: action.message,
            errorMessage: null,
            credentials: action.credentials
        };
    case types.POST_PASSWORD_SUCCESS:
    case types.POST_LOGIN_SUCCESS:
        return {
            ...state,
            isFetching: false,
            isAuthenticated: true,
            jwt: action.jwt
        };
    case types.GET_PASSWORD_FAILURE:
    case types.POST_LOGIN_FAILURE:
        return {
            ...state,
            isFetching: false,
            isAuthenticated: false,
            successMessage: null,
            errorMessage: action.message
        };
    default:
        return state;
    }
}
