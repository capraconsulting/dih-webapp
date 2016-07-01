import axios from 'axios';

import store from '../store';
import * as actions from '../actions/destinationActions';
import * as notification from '../actions/notificationActions';

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
        .catch(e => {
            if (__DEV__) console.error(e); // eslint-disable-line
            const msg = 'Something went wrong while fetching destinations.';
            store.dispatch(notification.addNotification(msg, 'error'));
        });
}

/*
* postDesination
* @param {destinationObject} Object for destination, contains property ǹame
*/
export function postDestination(destinationObject) {
    return axios
        .post(`${BASE_URL}/destinations`, destinationObject)
        .then(() => {
            const msg = `«${destinationObject.name}» has been added to destinations.`;
            getDestinations();
            store.dispatch(notification.addNotification(msg, 'success'));
        })
        .catch(e => {
            if (__DEV__) console.error(e); // eslint-disable-line

            let msg;
            let type;

            if (e.data.name === 'ValidationError') {
                msg = e.data.message;
                type = 'warning';
            } else {
                msg = 'Something went wrong while adding destination.';
                type = 'error';
            }

            store.dispatch(notification.addNotification(msg, type));
        });
}
