import axios from 'axios';

import store from '../store';
import * as actions from '../actions/tripActions';

const BASE_URL = process.env.BASE_URL;

/*
* postTrip
* @param {data} Object containing 'selectedDestination', 'wishStartDate' and 'wishEndDate'
*/
export function postTrip(data) {
    const tripObject = {
        userId: 1, // TODO: Replace with the logged in user
        destinationId: parseInt(data.selectedDestination, 10),
        wishStartDate: new Date(data.wishStartDate),
        wishEndDate: new Date(data.wishEndDate),
        startDate: null,
        endDate: null
    };

    return axios
        .post(`${BASE_URL}/trips`, tripObject)
        .then(() => {
            // TODO: Notify user that the submission was successful (react-redux-notifications?)
        })
        .catch(e => { console.error(e); }); // eslint-disable-line
}

/*
* getTrips
*/
export function getTrips() {
    return axios
        .get(`${BASE_URL}/trips`)
        .then(response => {
            store.dispatch(actions.getTripsSuccess(response.data));
        })
        .catch(e => { console.error(e); }); // eslint-disable-line
}

/*
* setTripStatus
* @param {tripId} Unique identifier for a trip
*/
export function setTripStatus(tripId) {
    const newStatusObject = { status: 'ACCEPTED' };
    return axios
        .put(`${BASE_URL}/trips/${tripId}`, newStatusObject)
        .then(() => {
            getTrips();
            // TODO: Notify user that the trip was successfully approved
        })
        .catch(e => { console.error(e); }); // eslint-disable-line
}
