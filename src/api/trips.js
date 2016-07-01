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
        userId: 1, // @TODO: Replace with the logged in user
        destinationId: parseInt(data.selectedDestination, 10),
        wishStartDate: new Date(data.wishStartDate),
        wishEndDate: new Date(data.wishEndDate),
        startDate: null,
        endDate: null
    };

    return axios
        .post(`${BASE_URL}/trips`, tripObject)
        .then(() => {
            // @TODO: Notify user that the submission was successful (react-redux-notifications?)
        })
        .catch(e => { console.error(e); }); // eslint-disable-line
}

/*
* getTrips
* @return {Promise} axios Promise
*/
export function getTrips() {
    return axios
        .get(`${BASE_URL}/trips`)
        .then(response => {
            store.dispatch(actions.getTripsRequestSuccess(response.data));
        })
        .catch(e => {
            store.dispatch(actions.getTripsRequestFailure());
            console.error(e); // eslint-disable-line
        });
}

/*
* getTripsForUser
* @return {Promise} axios Promise
*/
export function getTripsForUser(userId) {
    return axios
        .get(`${BASE_URL}/trips?userId=${userId}`)
        .then(response => {
            store.dispatch(actions.getTripsForUserSuccess(response.data));
        })
        .catch(e => {
            store.dispatch(actions.getTripsForUserFailure());
            console.error(e); // eslint-disable-line
        });
}

/*
* getTripsForUser
* @return {Promise} axios Promise
*/
export function getTripsForDestination(destinationId, status) {
    return axios
        .get(`${BASE_URL}/trips?destinationId=${destinationId}&status=${status}`)
        .then(response => {
            store.dispatch(actions.getTripsForDestinationSuccess(response.data));
        })
        .catch(e => {
            store.dispatch(actions.getTripsForDestinationFailure());
            console.error(e); // eslint-disable-line
        });
}

/*
* putTrip
* @param {trip} Trip object
* @return {Promise} axios Promise
*/
export function putTrip(trip) {
    store.dispatch(actions.putTripRequestStart());
    return axios
        .put(`${BASE_URL}/trips/${trip.id}`, trip)
        .then(() => {
            store.dispatch(actions.putTripRequestSuccess());
            getTrips();
            // @TODO: Notify user that the trip was successfully approved
        })
        .catch(e => {
            store.dispatch(actions.putTripRequestFailure());
            console.error(e);// eslint-disable-line
        });
}
