import * as types from './types/emails';
import { CALL_API } from '../middleware/api';

export function retrieve(id) {
    return {
        [CALL_API]: {
            method: 'get',
            url: `/mailtemplates/${id}`,
            types: [
                types.GET_EMAIL_REQUEST,
                types.GET_EMAIL_SUCCESS,
                types.GET_EMAIL_FAILURE
            ],
            authenticated: true
        }
    };
}

export function update(data) {
    return {
        [CALL_API]: {
            method: 'put',
            url: `/mailtemplates/${data.id}`,
            types: [
                types.PUT_EMAIL_REQUEST,
                types.PUT_EMAIL_SUCCESS,
                types.PUT_EMAIL_FAILURE
            ],
            authenticated: true,
            data
        }
    };
}
