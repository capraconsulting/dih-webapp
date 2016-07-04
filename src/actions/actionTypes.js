/*
API ACTION TYPES
All API calls should have 3 separate action types, one for each part of the
asynchronous request cycle:

export const GET_TRIPS_REQUEST = 'GET_TRIPS_REQUEST';
export const GET_TRIPS_SUCCESS = 'GET_TRIPS_SUCCESS';
export const GET_TRIPS_FAILURE = 'GET_TRIPS_FAILURE';

Also: Make sure to use CRUD keywords (POST, GET, PUT, DELETE) for all API calls.
This allows us to separate between API actions and other actions.

NON-API ACTION TYPES:
Don't use CRUD syntax. Other than that, just do whatever makes sense.
*/

// Accounts
export const GET_ACCOUNT_SUCCESS = 'GET_ACCOUNT_SUCCESS';
export const PUT_ACCOUNT_SUCCESS = 'PUT_ACCOUNT_SUCCESS';

// Destinations
export const POST_DESTINATION_SUCCESS = 'POST_DESTINATION_SUCCESS';
export const GET_DESTINATIONS_SUCCESS = 'GET_DESTINATIONS_SUCCESS';

// Trips
export const GET_TRIPS_REQUEST = 'GET_TRIPS_REQUEST';
export const GET_TRIPS_SUCCESS = 'GET_TRIPS_SUCCESS';
export const GET_TRIPS_FAILURE = 'GET_TRIPS_FAILURE';

export const PUT_TRIP_REQUEST = 'PUT_TRIP_REQUEST';
export const PUT_TRIP_SUCCESS = 'PUT_TRIP_SUCCESS';
export const PUT_TRIP_FAILURE = 'PUT_TRIP_FAILURE';

// users
export const POST_USER_REQUEST = 'POST_USER_REQUEST';
export const POST_USER_SUCCESS = 'POST_USER_SUCCESS';
export const POST_USER_FAILURE = 'POST_USER_FAILURE';
