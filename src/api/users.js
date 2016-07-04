import axios from 'axios';
import store from '../store';
import * as actions from '../actions/userActions';
const BASE_URL = process.env.BASE_URL;

/*
* create
*
* @TODO Should use reduxForm and centralize all error handling
* @param {Object} Object for user, must contain the base properties
* firstname, lastname, birth and email
*/
export function create(user) {
    store.dispatch(actions.postUserRequest());
    return axios
        .post(`${BASE_URL}/users`, user)
        .then(response => {
            store.dispatch(actions.postUserSuccess(response.data));
        })
        .catch(response => {
            store.dispatch(actions.postUserFailure(response.data));
            throw new Error(response.data.message);
        });
}
