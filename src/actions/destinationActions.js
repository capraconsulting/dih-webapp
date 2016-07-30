import * as types from './types/destinations';
import { CALL_API } from '../middleware/api';

export function list() {
    return {
        [CALL_API]: {
            method: 'get',
            url: '/destinations',
            types: [
                types.GET_DESTINATIONS_REQUEST,
                types.GET_DESTINATIONS_SUCCESS,
                types.GET_DESTINATIONS_FAILURE
            ],
            authenticated: true
        }
    };
}

export function retrieve(id) {
    return {
        [CALL_API]: {
            method: 'get',
            url: `/destinations/${id}`,
            types: [
                types.GET_DESTINATION_REQUEST,
                types.GET_DESTINATION_SUCCESS,
                types.GET_DESTINATION_FAILURE
            ],
            authenticated: true
        }
    };
}

export function create(data) {
    return {
        [CALL_API]: {
            method: 'post',
            url: '/destinations',
            types: [
                types.POST_DESTINATION_REQUEST,
                types.POST_DESTINATION_SUCCESS,
                types.POST_DESTINATION_FAILURE
            ],
            authenticated: true,
            data
        }
    };
}

export function update(data) {
    return {
        [CALL_API]: {
            method: 'put',
            url: `/destinations/${data.id}`,
            types: [
                types.PUT_DESTINATION_REQUEST,
                types.PUT_DESTINATION_SUCCESS,
                types.PUT_DESTINATION_FAILURE
            ],
            authenticated: true,
            data
        }
    };
}
