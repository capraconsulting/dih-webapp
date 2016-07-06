import * as types from './actionTypes';
import { CALL_API } from '../middleware/api';

export function list() {
    return {
        [CALL_API]: {
            method: 'get',
            url: '/users',
            types: [
                types.GET_USERS_REQUEST,
                types.GET_USERS_SUCCESS,
                types.GET_USERS_FAILURE
            ],
            authenticated: true
        }
    };
}

export function create(data) {
    return {
        [CALL_API]: {
            method: 'post',
            url: '/users',
            types: [
                types.POST_USER_REQUEST,
                types.POST_USER_SUCCESS,
                types.POST_USER_FAILURE
            ],
            authenticated: true,
            data
        }
    };
}
