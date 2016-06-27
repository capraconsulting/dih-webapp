import axios from 'axios';
import store from '../store';
import { postUserSuccess, postUserFailure, postUserStart } from '../actions/userActions';
const BASE_URL = process.env.BASE_URL;

/*
* create
*
* @TODO Should use reduxForm and centralize all error handling
* @param {Object} Object for user, must contain the base properties
* firstname, lastname, birth and email
*/
export function create(user) {
    store.dispatch(postUserStart());
    return axios
        .post(`${BASE_URL}/users`, user)
        .then(response => {
            store.dispatch(postUserSuccess(response.data));
        })
        .catch(response => {
            store.dispatch(postUserFailure(response.data));
            throw new Error(response.data.message);
        });
}
