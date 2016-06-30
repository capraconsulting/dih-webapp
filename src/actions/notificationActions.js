import { ADD_NOTIFICATION } from './actionTypes';

export function addNotification(message, level) {
    return {
        type: ADD_NOTIFICATION,
        message,
        level
    };
}
