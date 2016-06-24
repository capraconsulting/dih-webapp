import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

/*
* postNewTrip
* @param {data} Object containing 'selectedDestination', 'wishStartDate' and 'wishEndDate'
*/
export function postNewTrip(data) {
    const newTripObject = {
        userId: 1, // TODO: Replace with the logged in user
        destinationId: parseInt(data.selectedDestination, 10),
        wishStartDate: new Date(data.wishStartDate),
        wishEndDate: new Date(data.wishEndDate),
        startDate: null,
        endDate: null
    };

    return axios
        .post(`${BASE_URL}/trips`, newTripObject)
        .then(() => {
            // console.log('New trip submission Success!');
        })
        .catch(e => { console.error(e); });
}
