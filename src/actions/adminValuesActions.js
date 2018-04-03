import * as types from './types/adminValues';
import { CALL_API } from '../middleware/api';

const ROOT_ENDPOINT = '/adminvalues';

export function list() {
    return {
        [CALL_API]: {
            method: 'GET',
            url: ROOT_ENDPOINT,
            types: [
                types.GET_ADMIN_VALUES_REQUEST,
                types.GET_ADMIN_VALUES_SUCCESS,
                types.GET_ADMIN_VALUES_FAILURE
            ],
            authenticated: true
        }
    };
}

export function retrieve(id) {
    return {
        [CALL_API]: {
            method: 'GET',
            url: `${ROOT_ENDPOINT}/${id}`,
            types: [
                types.GET_ADMIN_VALUE_REQUEST,
                types.GET_ADMIN_VALUE_SUCCESS,
                types.GET_ADMIN_VALUE_FAILURE
            ],
            authenticated: true
        }
    };
}

export function create(data) {
    return {
        [CALL_API]: {
            method: 'POST',
            url: ROOT_ENDPOINT,
            types: [
                types.POST_ADMIN_VALUE_REQUEST,
                types.POST_ADMIN_VALUE_SUCCESS,
                types.POST_ADMIN_VALUE_FAILURE
            ],
            authenticated: true,
            data
        }
    };
}

export function update(data) {
    return {
        [CALL_API]: {
            method: 'PUT',
            url: `${ROOT_ENDPOINT}/${data.id}`,
            types: [
                types.PUT_ADMIN_VALUE_REQUEST,
                types.PUT_ADMIN_VALUE_SUCCESS,
                types.PUT_ADMIN_VALUE_FAILURE
            ],
            authenticated: true,
            data
        }
    };
}
