import { POST_USER_REQUEST, POST_USER_SUCCESS, POST_USER_FAILURE } from './actionTypes';

export function postUserRequest() {
    return {
        type: POST_USER_REQUEST
    };
}

export function postUserSuccess(user) {
    return {
        type: POST_USER_SUCCESS,
        user
    };
}

export function postUserFailure(error) {
    return {
        type: POST_USER_FAILURE,
        error
    };
}
