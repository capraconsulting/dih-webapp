import axios from 'axios';

import store from '../store';
import * as actions from '../actions/destinationActions';

const BASE_URL = process.env.BASE_URL;

/*
* getDestinations
*/
export function getDestinations() {
    return axios
        .get(`${BASE_URL}/destinations`)
        .then(response => {
            store.dispatch(actions.getDestinationsSuccess(response.data));
        })
        .catch(e => { console.error(e); });
}

/*
* postDesination
* @param {destinationObject} Object for destination, contains property ǹame
*/
export function postDestination(destinationObject) {
    return axios
        .post(`${BASE_URL}/destinations`, destinationObject)
        .then(() => {
            getDestinations();
        })
        .catch(e => { console.error(e); });
}
