import _ from 'lodash';
import moment from 'moment';
import { TRIP_STATUSES } from './constants';

export function tripStatusesForDropdown() {
    const options = [];
    _.forOwn(TRIP_STATUSES, status => {
        options.push({
            value: status,
            label: status[0].toUpperCase() + status.slice(1).toLowerCase()
        });
    });
    return options;
}

export function emailIsValid(email) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
}

/*
 * getErrorMessageForTripSubmission
 * @param trip Object - trip object to be validated.
 * @param destination Object - destination the trip is regarding.
 * @returns msg String - Error message that can be shown to the user, or null.
 */
export function getErrorMessageForTripSubmission(trip, destination) {
    let msg = null;
    // Destination won't be acitve
    if (destination.endDate && moment(destination.endDate) <= moment(trip.startDate)) {
        msg = `The destination will be inactive at that point.
        As of now it seems we will end it at ${destination.endDate}.
        Please select a start date that corresponds with that, but do
        not hesitate to add any note regarding the time period in the
        "Additional information" field`;
    }
    return msg;
}
