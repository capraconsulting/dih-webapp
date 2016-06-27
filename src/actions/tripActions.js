import { GET_TRIPS_SUCCESS } from './actionTypes';

export function getTripsSuccess(trips) {
    return {
        type: GET_TRIPS_SUCCESS,
        trips
    };
}
