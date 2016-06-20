import * as types from './actionTypes';

export function postDestinationSuccess() {
    return {
        type: types.ADD_DESTINATION_SUCCESS
    };
}

export function getDestinationsSuccess(destinations) {
    return {
        type: types.GET_DESTINATIONS_SUCCESS,
        destinations
    };
}
