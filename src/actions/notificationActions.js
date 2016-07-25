import { PUSH_NOTIFICATION } from './types';

export function pushNotification(message, level) {
    return {
        type: PUSH_NOTIFICATION,
        message,
        level
    };
}
