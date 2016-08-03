import * as types from '../actions/types/account';

const initialState = {
    account: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
    case types.GET_ACCOUNT_SUCCESS:
        return { ...state, account: action.res };
    case types.PUT_ACCOUNT_SUCCESS:
        return state;
    default:
        return state;
    }
};
