import axios from 'axios';

const BASE_URL = require('../../config.json').BASE_URL;

/*
* createDestination
*  @param {destinationObject} Object for destination, contains property ǹame
*/
export function createDestination(destinationObject) {
    return axios
        .post(`${BASE_URL}/destinations`, destinationObject)
        .catch(e => { console.error(e); } );
}
