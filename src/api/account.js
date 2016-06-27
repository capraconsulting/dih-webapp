import axios from 'axios';

import store from '../store';
import * as actions from '../actions/accountActions';

const BASE_URL = process.env.BASE_URL;

/*
* getAccount
*/
export function getAccount(token) {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    return axios
        .get(`${BASE_URL}/account`, config)
        .then(response => {
            store.dispatch(actions.getAccountSuccess(response.data));
        })
        .catch(e => { console.error(e); });
}

/*
 * putAccount
 */
export function putAccount(token, data) {
    const payload = {
        password: data.password
    };

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    return axios
        .put(`${BASE_URL}/account`, payload, config)
        .then(response => {
            store.dispatch(actions.putAccountSuccess(response.data));
        })
        .catch(e => { console.log(e); });
}
