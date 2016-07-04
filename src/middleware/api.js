import axios from 'axios';
import { browserHistory } from 'react-router';

const API = axios.create({ baseURL: process.env.BASE_URL });
API.interceptors.response.use(response => (
    Promise.resolve(response)
), error => {
    if (error.status === 401) {
        browserHistory.push('/login');
    }
    return Promise.reject(error);
});

function callApi(method, url, authenticated, data, additionalHeaders) {
    const token = localStorage.getItem('jwt') || null;

    const config = {
        method,
        url,
        data
    };

    if (authenticated) {
        if (token) config.headers = { Authorization: `Bearer ${token}` };
    }

    // Important to override in order to update password
    if (additionalHeaders) {
        config.headers = additionalHeaders;
    }

    return API.request(config)
        .then(res => res.data);
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
    const callAPI = action[CALL_API];

    if (typeof callAPI === 'undefined') {
        return next(action);
    }

    const { method, url, types, authenticated, data, additionalHeaders } = callAPI;

    const [requestType, successType, errorType] = types;

    next({ type: requestType });
    return callApi(method, url, authenticated, data, additionalHeaders)
        .then(res =>
            next({
                res,
                authenticated,
                type: successType
            })
        )
        .catch(err =>
            next({
                error: err.data.message || 'There was an error.',
                type: errorType
            })
        );
};
