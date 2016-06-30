import * as types from '../actions/actionTypes';

const initialState = {
    jwt: null
}

export default (state = initialState, action) => {
	switch (action.type) {
	case types.LOGIN_SUCCESS:
		return state;
	case types.LOGIN_FAILURE:
		return { ...state, destinations: action.destinations };
	default:
		return state;
	}
};
