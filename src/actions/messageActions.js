import { CALL_API } from '../middleware/api';
import * as types from './types/messages';

export function addRecipients(recipients) {
    return {
        type: types.ADD_RECIPIENTS,
        recipients
    };
}

export function addMessageData(data) {
    return {
        type: types.SET_MESSAGE_DATA,
        ...data
    };
}

export function reset() {
    return {
        type: types.RESET_MESSAGE_STATE
    };
}

export function send(data) {
    return {
        [CALL_API]: {
            method: 'post',
            url: '/messages',
            types: [
                types.PUT_MESSAGE_REQUEST,
                types.PUT_MESSAGE_SUCCESS,
                types.PUT_MESSAGE_FAILURE
            ],
            authenticated: true,
            data
        }
    };
}
