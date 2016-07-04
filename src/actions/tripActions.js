import * as actions from './actionTypes';
import { CALL_API } from '../middleware/api';

export function list() {
    return {
        [CALL_API]: {
            method: 'get',
            url: '/trips',
            types: [
                actions.GET_TRIPS_REQUEST,
                actions.GET_TRIPS_SUCCESS,
                actions.GET_TRIPS_FAILURE
            ],
            authenticated: true
        }
    };
}

export function create(data) {
    return {
        [CALL_API]: {
            method: 'post',
            url: '/trips',
            types: [
                actions.POST_TRIP_REQUEST,
                actions.POST_TRIP_SUCCESS,
                actions.POST_TRIP_FAILURE
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
            url: `/trips/${data.id}`,
            types: [
                actions.PUT_TRIP_REQUEST,
                actions.PUT_TRIP_SUCCESS,
                actions.PUT_TRIP_FAILURE
            ],
            authenticated: true,
            data
        }
    };
}
