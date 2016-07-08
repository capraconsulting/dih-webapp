import axios from 'axios';
import { logout } from '../actions/authenticationActions';
const API = axios.create({ baseURL: process.env.BASE_URL });

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => { // eslint-disable-line
    const callAPI = action[CALL_API];

    if (typeof callAPI === 'undefined') {
        return next(action);
    }

    API.interceptors.response.use(response => (
        Promise.resolve(response)
    ), error => {
        if (error.status === 401) store.dispatch(logout());
        return Promise.reject(error);
    });

    const { method, url, types, authenticated, data, headers } = callAPI;

    const [requestType, successType, errorType] = types;

    const token = localStorage.getItem('jwt') || null;

    const config = {
        method,
        url,
        data
    };

    if (authenticated) {
        if (token) config.headers = { Authorization: `Bearer ${token}` };
    }

    if (headers) {
        config.headers = headers;
    }

    next({ type: requestType });
    return API.request(config)
        .then(res =>
            next({
                res: res.data,
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
