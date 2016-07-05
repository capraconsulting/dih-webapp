import * as types from './actionTypes';
import { CALL_API } from '../middleware/api';

export function login(data) {
    return {
        [CALL_API]: {
            method: 'post',
            url: '/authenticate',
            types: [
                types.POST_LOGIN_REQUEST,
                types.POST_LOGIN_SUCCESS,
                types.POST_LOGIN_FAILURE
            ],
            authenticated: false,
            data
        }
    };
}

export function setPassword(data, headers) {
    return {
        [CALL_API]: {
            method: 'post',
            url: '/authenticate/password',
            types: [
                types.POST_PASSWORD_REQUEST,
                types.POST_PASSWORD_SUCCESS,
                types.POST_PASSWORD_FAILURE
            ],
            authenticated: true,
            data,
            headers
        }
    };
}
