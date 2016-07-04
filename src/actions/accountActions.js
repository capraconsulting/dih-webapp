import * as types from './actionTypes';
import { CALL_API } from '../middleware/api';

export function retrieve(headers) {
    return {
        [CALL_API]: {
            method: 'get',
            url: '/account',
            types: [
                types.GET_ACCOUNT_REQUEST,
                types.GET_ACCOUNT_SUCCESS,
                types.GET_ACCOUNT_FAILURE
            ],
            authenticated: true,
            data: null,
            headers
        }
    };
}

export function update(data, headers) {
    return {
        [CALL_API]: {
            method: 'put',
            url: '/account',
            types: [
                types.PUT_ACCOUNT_REQUEST,
                types.PUT_ACCOUNT_SUCCESS,
                types.PUT_ACCOUNT_FAILURE
            ],
            authenticated: true,
            data,
            headers
        }
    };
}
