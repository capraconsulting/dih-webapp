import * as actionTypes from './actionTypes/tripActionTypes';

export function getTripsRequest() {
    return {
        type: actionTypes.GET_TRIPS_REQUEST
    };
}

export function getTripsSuccess(trips) {
    return {
        type: actionTypes.GET_TRIPS_SUCCESS,
        trips
    };
}

export function getTripsFailure() {
    return {
        type: actionTypes.GET_TRIPS_FAILURE
    };
}

export function putTripRequest() {
    return {
        type: actionTypes.PUT_TRIP_REQUEST
    };
}

export function putTripSuccess() {
    return {
        type: actionTypes.PUT_TRIP_SUCCESS
    };
}

export function putTripFailure() {
    return {
        type: actionTypes.PUT_TRIP_FAILURE
    };
}

export function getTripsForDestinationStart() {
    return {
        type: actionTypes.GET_TRIPS_FOR_DESTINATION_REQUEST
    };
}

export function getTripsForDestinationSuccess(trips) {
    return {
        type: actionTypes.GET_TRIPS_FOR_DESTINATION_SUCCESS,
        trips
    };
}

export function getTripsForDestinationFailure() {
    return {
        type: actionTypes.GET_TRIPS_FOR_DESTINATION_FAILURE
    };
}

export function getTripsForUserStart() {
    return {
        type: actionTypes.GET_TRIPS_FOR_USER_REQUEST
    };
}

export function getTripsForUserSuccess(trips) {
    return {
        type: actionTypes.GET_TRIPS_FOR_USER_SUCCESS,
        trips
    };
}

export function getTripsForUserFailure() {
    return {
        type: actionTypes.GET_TRIPS_FOR_USER_FAILURE
    };
}
