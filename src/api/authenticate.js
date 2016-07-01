import axios from 'axios';

import store from '../store';
import { loginSuccess, loginFailure, loginRequest } from '../actions/authenticationActions';

const BASE_URL = process.env.BASE_URL;


/*
* postDesination
* @param {destinationObject} Object for destination, contains property ǹame
*/
export function login(credentials) {
    loginRequest(credentials);
    return axios
        .post(`${BASE_URL}/authenticate`, credentials)
        .then(response => {
            localStorage.setItem('jwt', response.data.jwt);
            store.dispatch(loginSuccess(response.data.jwt));
        })
        .catch(err => {
            store.dispatch(loginFailure(err.data));
            throw new Error(err.data.message);
        });
}
