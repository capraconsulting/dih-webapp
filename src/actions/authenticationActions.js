import axios from 'axios';
import { browserHistory } from 'react-router';
import * as types from './types/authentication';

const requestLogin = (credentials) => ({
    type: types.POST_LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    credentials
});

const receiveLogin = (data) => ({
    type: types.POST_LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    jwt: data.jwt
});

const loginError = (message) => ({
    type: types.POST_LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
});

const requestLogout = () => ({
    type: types.LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
});

const receiveLogout = () => ({
    type: types.LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
});

const passwordResetRequest = () => ({
    type: types.GET_PASSWORD_REQUEST,
    isFetching: true,
    isAuthenticated: false
});

const receivePasswordReset = () => ({
    type: types.GET_PASSWORD_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
    message: 'An email with further instructions have been sent to the specified email.'
});

const failurePasswordReset = (message) => ({
    type: types.GET_PASSWORD_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    successMessage: null,
    message
});

export const login = (data) => dispatch => {
    const config = {
        baseURL: process.env.BASE_URL,
        method: 'post',
        url: '/authenticate',
        data
    };
    dispatch(requestLogin(data));
    return axios(config)
        .then(res => {
            localStorage.setItem('jwt', res.data.jwt);
            browserHistory.push('/profile');
            return dispatch(receiveLogin(res.data));
        })
        .catch(err => dispatch(loginError(err.data.message)));
};

export const requestPasswordReset = (data) => dispatch => {
    const config = {
        baseURL: process.env.BASE_URL,
        method: 'put',
        url: '/authenticate/password',
        data
    };
    dispatch(passwordResetRequest());
    return axios(config)
        .then(() => dispatch(receivePasswordReset()))
        .catch(err => dispatch(failurePasswordReset(err.data.message)));
};

export const setPassword = (data, headers) => dispatch => {
    const config = {
        baseURL: process.env.BASE_URL,
        method: 'post',
        url: '/authenticate/password',
        data,
        headers
    };
    dispatch(requestLogin(data));
    return axios(config)
        .then(res => {
            localStorage.setItem('jwt', res.data.jwt);
            browserHistory.push('/profile');
            return dispatch(receiveLogin(res.data));
        })
        .catch(err => dispatch(loginError(err.data.message)));
};

export const logout = () => dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('jwt');
    browserHistory.push('/login');
    dispatch(receiveLogout());
};
