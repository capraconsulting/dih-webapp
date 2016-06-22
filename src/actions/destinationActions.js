import { ADD_DESTINATION_SUCCESS, GET_DESTINATIONS_SUCCESS } from './actionTypes';

export function postDestinationSuccess() {
    return {
        type: ADD_DESTINATION_SUCCESS
    };
}

export function getDestinationsSuccess(destinations) {
    return {
        type: GET_DESTINATIONS_SUCCESS,
        destinations
    };
}
