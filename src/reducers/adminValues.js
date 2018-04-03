import * as types from '../actions/types/adminValues';

const initialState = {
    isFetching: false,
    errorMessage: null,
    successMessage: null,
    values: [],
    adminValue: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
    case types.GET_ADMIN_VALUE_REQUEST:
    case types.GET_ADMIN_VALUES_REQUEST:
        return {
            ...state,
            isFetching: true
        };
    case types.GET_ADMIN_VALUES_SUCCESS:
        return {
            ...state,
            isFetching: false,
            values: action.res
        };
    case types.GET_ADMIN_VALUE_SUCCESS:
        return {
            ...state,
            isFetching: false,
            adminValue: action.res
        };
    case types.POST_ADMIN_VALUE_SUCCESS:
        return {
            ...state,
            isFetching: false,
            errorMessage: null,
            successMessage: "We've added the new value."
        };
    case types.GET_ADMIN_VALUE_FAILURE:
    case types.GET_ADMIN_VALUES_FAILURE:
    case types.POST_ADMIN_VALUE_FAILURE:
        return {
            ...state,
            isFetching: false,
            successMessage: null,
            errorMessage: action.error
        };
    default:
        return state;
    }
}
