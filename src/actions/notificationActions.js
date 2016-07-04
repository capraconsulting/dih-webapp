import { PUSH_NOTIFICATION } from './actionTypes';

export function pushNotification(message, level) {
    return {
        type: PUSH_NOTIFICATION,
        message,
        level
    };
}
