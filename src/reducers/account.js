import * as types from '../actions/actionTypes';

const initialState = {
    account: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
    case types.GET_ACCOUNT_SUCCESS:
        return { ...state, account: action.account };
    default:
        return state;
    }
};
