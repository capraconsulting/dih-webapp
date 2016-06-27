import { GET_ACCOUNT_SUCCESS } from './actionTypes';

export function getAccountSuccess(account) {
    return {
        type: GET_ACCOUNT_SUCCESS,
        account
    };
}
