import { GET_ACCOUNT_SUCCESS, PUT_ACCOUNT_SUCCESS } from './actionTypes';

export function getAccountSuccess(account) {
    return {
        type: GET_ACCOUNT_SUCCESS,
        account
    };
}

export function putAccountSuccess(account) {
    return {
        type: PUT_ACCOUNT_SUCCESS,
        account
    };
}
