import * as types from '../actions/types/emails';

const initialState = {
    isFetching: false,
    email: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
    case types.GET_DESTINATION_REQUEST:
        return {
            ...state,
            isFetching: true
        };
    case types.GET_DESTINATION_SUCCESS:
        return {
            ...state,
            isFetching: false,
            email: action.res
        };
    default:
        return {
            ...state,
            isFetching: false,
            email: {
                name: 'Email name',
                description: 'A description about when this email is going to be sent and to whom',
                html: `<h1>TITTEL</h1><p><em><strong>BoldItalic</strong></em></p>
                <p>An ordered list:</p><ol><li>One</li><li>Two</li></ol>`
            }
        };
    }
}
