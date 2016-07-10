import * as types from './types/trips';
import { CALL_API } from '../middleware/api';

export function list() {
    return {
        [CALL_API]: {
            method: 'get',
            url: '/trips',
            types: [
                types.GET_TRIPS_REQUEST,
                types.GET_TRIPS_SUCCESS,
                types.GET_TRIPS_FAILURE
            ],
            authenticated: true
        }
    };
}

export function listForDestinationWithStatus(destinationId, status) {
    return {
        [CALL_API]: {
            method: 'get',
            url: `/trips?destinationId=${destinationId}&status=${status}`,
            types: [
                types.GET_TRIPS_FOR_DESTINATION_REQUEST,
                types.GET_TRIPS_FOR_DESTINATION_SUCCESS,
                types.GET_TRIPS_FOR_DESTINATION_FAILURE
            ],
            authenticated: true
        }
    };
}

export function retrieve(id) {
    return {
        [CALL_API]: {
            method: 'get',
            url: `/trips/${id}`,
            types: [
                types.GET_TRIP_REQUEST,
                types.GET_TRIP_SUCCESS,
                types.GET_TRIP_FAILURE
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
                types.POST_TRIP_REQUEST,
                types.POST_TRIP_SUCCESS,
                types.POST_TRIP_FAILURE
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
                types.PUT_TRIP_REQUEST,
                types.PUT_TRIP_SUCCESS,
                types.PUT_TRIP_FAILURE
            ],
            authenticated: true,
            data
        }
    };
}
