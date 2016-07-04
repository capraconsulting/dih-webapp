import * as types from '../actions/actionTypes';

const initialState = {
    isFetching: false,
    errorMessage: null,
    isAuthenticated: typeof localStorage.getItem('jwt') === 'string'
};
// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function (state = initialState, action) {
    switch (action.type) {
    case types.LOGIN_REQUEST:
        return {
            ...state,
            isFetching: true,
            isAuthenticated: false,
            credentials: action.creds
        };
    case types.SET_PASSWORD_SUCCESS:
    case types.LOGIN_SUCCESS:
        localStorage.setItem('jwt', action.res.jwt);
        return {
            ...state,
            isFetching: false,
            isAuthenticated: true,
            jwt: action.res.jwt
        };
    case types.LOGIN_FAILURE:
        return {
            ...state,
            isFetching: false,
            isAuthenticated: false,
            errorMessage: action.error
        };
    default:
        return state;
    }
}
