import * as types from './actionTypes';
import { CALL_API } from '../middleware/api';

export function login(data) {
    return {
        [CALL_API]: {
            method: 'post',
            url: '/authenticate',
            types: [
                types.LOGIN_REQUEST,
                types.LOGIN_SUCCESS,
                types.LOGIN_FAILURE
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
                types.SET_PASSWORD_REQUEST,
                types.SET_PASSWORD_SUCCESS,
                types.SET_PASSWORD_FAILURE
            ],
            authenticated: true,
            data,
            headers
        }
    };
}
