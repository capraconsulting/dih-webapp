import * as types from '../actions/types/messages';

const initialState = {
    sending: false,
    sent: false,
    response: null,
    recipients: [],
    subject: null,
    medium: null,
    message: null,
    sender: null
};

export default function (state = initialState, action) {
    switch (action.type) {
    case types.ADD_RECIPIENTS:
        return {
            ...state,
            sent: false,
            recipients: action.recipients
        };
    case types.SET_MESSAGE_DATA:
        return {
            ...state,
            sent: false,
            medium: action.medium,
            subject: action.subject,
            message: action.message,
            sender: action.sender
        };
    case types.PUT_MESSAGE_REQUEST:
        return {
            ...state,
            sending: true,
            sent: true
        };
    case types.PUT_MESSAGE_SUCCESS:
        return {
            ...state,
            sending: false,
            response: action.res
        };
    case types.RESET_MESSAGE_STATE:
        return initialState;
    default:
        return state;
    }
}
