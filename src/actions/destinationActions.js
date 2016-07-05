import * as actions from './actionTypes';
import { CALL_API } from '../middleware/api';

export function list() {
    return {
        [CALL_API]: {
            method: 'get',
            url: '/destinations',
            types: [
                actions.GET_DESTINATIONS_REQUEST,
                actions.GET_DESTINATIONS_SUCCESS,
                actions.GET_DESTINATIONS_FAILURE
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
                actions.GET_DESTINATION_REQUEST,
                actions.GET_DESTINATION_SUCCESS,
                actions.GET_DESTINATION_FAILURE
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
                actions.POST_DESTINATION_REQUEST,
                actions.POST_DESTINATION_SUCCESS,
                actions.POST_DESTINATION_FAILURE
            ],
            authenticated: true,
            data
        }
    };
}
