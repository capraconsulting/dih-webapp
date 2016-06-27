import axios from 'axios';
const BASE_URL = process.env.BASE_URL;

/*
* create
*
* @param {Object} Object for user, must contain the base properties
* firstname, lastname, birth and email
*/
export function create(user) {
    return axios
        .post(`${BASE_URL}/users`, user);
}
