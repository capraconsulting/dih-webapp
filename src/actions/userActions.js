import { ADD_USER_SUCCESS, ADD_USER_FAILURE, ADD_USER_START } from './actionTypes';

export function postUserSuccess(user) {
    return {
        type: ADD_USER_SUCCESS,
        user
    };
}

export function postUserStart() {
    return {
        type: ADD_USER_START
    };
}

export function postUserFailure(error) {
    return {
        type: ADD_USER_FAILURE,
        error
    };
}
