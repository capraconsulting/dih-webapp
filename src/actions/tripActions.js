import * as actionTypes from './actionTypes/tripActionTypes';

export function getTripsRequestStart() {
    return {
        type: actionTypes.GET_TRIPS_REQUEST
    };
}

export function getTripsRequestSuccess(trips) {
    return {
        type: actionTypes.GET_TRIPS_SUCCESS,
        trips
    };
}

export function getTripsRequestFailure() {
    return {
        type: actionTypes.GET_TRIPS_FAILURE
    };
}

export function putTripRequestStart() {
    return {
        type: actionTypes.PUT_TRIP_REQUEST
    };
}

export function putTripRequestSuccess() {
    return {
        type: actionTypes.PUT_TRIP_SUCCESS
    };
}

export function putTripRequestFailure() {
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
