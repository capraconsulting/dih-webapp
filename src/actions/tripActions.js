import {
    GET_TRIPS_REQUEST,
    GET_TRIPS_SUCCESS,
    GET_TRIPS_FAILURE,
    PUT_TRIP_REQUEST,
    PUT_TRIP_SUCCESS,
    PUT_TRIP_FAILURE } from './actionTypes';

export function getTripsRequest() {
    return {
        type: GET_TRIPS_REQUEST
    };
}

export function getTripsSuccess(trips) {
    return {
        type: GET_TRIPS_SUCCESS,
        trips
    };
}

export function getTripsFailure() {
    return {
        type: GET_TRIPS_FAILURE
    };
}

export function putTripRequest() {
    return {
        type: PUT_TRIP_REQUEST
    };
}

export function putTripSuccess() {
    return {
        type: PUT_TRIP_SUCCESS
    };
}

export function putTripFailure() {
    return {
        type: PUT_TRIP_FAILURE
    };
}
