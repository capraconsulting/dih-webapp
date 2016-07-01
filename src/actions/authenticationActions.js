import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './actionTypes';
import { CALL_API } from '../middleware/api';

export function login(data) {
    return {
        [CALL_API]: {
            method: 'post',
            url: '/authenticate',
            types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
            authenticated: false,
            data
        }
    };
}
