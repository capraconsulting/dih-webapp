import { GET_TRIPS_REQUEST_START,
    GET_TRIPS_REQUEST_SUCCESS,
    GET_TRIPS_REQUEST_FAILURE,
    PUT_TRIP_REQUEST_START,
    PUT_TRIP_REQUEST_SUCCESS,
    PUT_TRIP_REQUEST_FAILURE } from './actionTypes';

export function getTripsRequestStart() {
    return {
        type: GET_TRIPS_REQUEST_START
    };
}

export function getTripsRequestSuccess(trips) {
    return {
        type: GET_TRIPS_REQUEST_SUCCESS,
        trips
    };
}

export function getTripsRequestFailure() {
    return {
        type: GET_TRIPS_REQUEST_FAILURE
    };
}

export function putTripRequestStart() {
    return {
        type: PUT_TRIP_REQUEST_START
    };
}

export function putTripRequestSuccess() {
    return {
        type: PUT_TRIP_REQUEST_SUCCESS
    };
}

export function putTripRequestFailure() {
    return {
        type: PUT_TRIP_REQUEST_FAILURE
    };
}
