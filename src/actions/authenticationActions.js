import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './actionTypes';

export function loginRequest(credentials) {
    return {
        type: LOGIN_REQUEST,
        credentials
    };
}

export function loginSuccess(jwt) {
    return {
        type: LOGIN_SUCCESS,
        jwt
    };
}

export function loginFailure(error) {
    return {
        type: LOGIN_FAILURE,
        error
    };
}
