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

// Notifications
export const PUSH_NOTIFICATION = 'PUSH_NOTIFICATION';
