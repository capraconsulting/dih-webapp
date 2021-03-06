import React from 'react';
import countries from './countries.json';
/**
* All constants used trouought the application.
* @module components/constants
*/


/**
* Preferred format of moment dates
* @type {string} Date format
*/
export const DATE_FORMAT = 'YYYY-MM-DD';

/**
* The possible roles a user can have.
* @type {object}
* @property {string} USER - Grants this user the basic user permissions.
* @property {string} MODERATOR - Grants this user the user permissions and moderator permissions.
* @property {string} ADMIN - Grants this user the admin permissions.
*/
export const USER_ROLES = {
    USER: 'USER',
    MODERATOR: 'MODERATOR',
    ADMIN: 'ADMIN'
};

/**
* The possible genders a user can have
* @type {object}
* @property {string} MALE - male
* @property {string} FEMALE - female
*/
export const GENDERS = {
    MALE: 'MALE',
    FEMALE: 'FEMALE'
};

/**
* The possible medical degrees a user can have
* @type {object}
* @property {string} DOCTOR - doctor
* @property {string} PARAMEDIC - paramedic
* @property {string} NURSE - nurse
* @property {string} MIDWIFE - midwife
* @property {string} PSYCHOLOGIST - psychologist
* @property {string} OTHER - Other
*/
export const USER_MEDICAL_DEGREES = {
    DOCTOR: 'Doctor',
    PARAMEDIC: 'Paramedic',
    NURSE: 'Nurse',
    MIDWIFE: 'Midwife',
    PSYCHOLOGIST: 'Psychologist',
    PHYSICAL_THERAPIST: 'Physical therapist',
    OTHER: 'Other'
};

/**
* The possible roles a user can have.
* @type {object}
* @property {string} PENDING - The trip is requested by a user but not handled by an admin
* @property {string} ACCEPTED - The trip is accepted by an admin
* @property {string} REJECTED - The trip is rejected by an admin
* @property {string} ACTIVE - The trip information is filled out and user is ready for the trip
* @property {string} CLOSED - The trip is closed. Happens when user cancels the trip
* @property {string} PRESENT - User is present at destination
* @property {string} LEFT - User has left destination
* @property {string} NOSHOW - User did not show up at destination
*/
export const TRIP_STATUSES = {
    PENDING: 'PENDING',
    ACCEPTED: 'ACCEPTED',
    REJECTED: 'REJECTED',
    ACTIVE: 'ACTIVE',
    CLOSED: 'CLOSED',
    PRESENT: 'PRESENT',
    LEFT: 'LEFT',
    NOSHOW: 'NO SHOW'
};

/**
* The possible methods of travel for a trip.
* @type {object}
* @property {string} PLANE - The user will arrive by plane, should trigger specific fields.
* @property {string} OTHER - The uset will arrive by other method than listed, should trigger
* a free text field.
*/
exports.TRAVEL_METHODS = {
    PLANE: 'PLANE',
    OTHER: 'OTHER'
};

exports.COUNTRIES = countries;

exports.KEY_CODES = {
    BREAK: 3,
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ESCAPE: 27,
    LEFT_ARROW: 37,
    UP_ARROW: 38,
    RIGHT_ARROW: 39,
    DOWN_ARROW: 40
};

export const TRIP_STATUS_LABELS = {
    PENDING: (
        <div className="ui empty label">
            <i className="circle icon"></i>
            Pending
        </div>
    ),
    ACCEPTED: (
        <div className="ui yellow label">
            <i className="circle icon"></i>
            Accepted
        </div>
    ),
    REJECTED: (
        <div className="ui red label">
            <i className="circle icon"></i>
            Rejected
        </div>
    ),
    ACTIVE: (
        <div className="ui olive label">
            <i className="circle icon"></i>
            Active
        </div>
    ),
    CLOSED: (
        <div className="ui black label">
            <i className="circle icon"></i>
            Closed
        </div>
    ),
    PRESENT: (
        <div className="ui green label">
            <i className="circle icon"></i>
            Present
        </div>
    ),
    LEFT: (
        <div className="ui grey label">
            <i className="circle icon"></i>
            Left
        </div>
    ),
    'NO SHOW': (
        <div className="ui orange label">
            <i className="circle icon"></i>
            No show
        </div>
    )
};

export const BOOLEAN_LABELS = {
    true: (
        <div className="ui green label">
            <i className="checkmark icon"></i>
            Active
        </div>
    ),
    false: (
        <div className="ui red label">
            <i className="remove icon"></i>
            Inactive
        </div>
    )
};

export const ROLE_LABELS = {
    USER: (
        <div className="ui empty label">
            <i className="user icon"></i>
            User
        </div>
    ),
    MODERATOR: (
        <div className="ui grey label">
            <i className="user icon"></i>
            Coordinator
        </div>
    ),
    ADMIN: (
        <div className="ui black label">
            <i className="user icon"></i>
            Administrator
        </div>
    )
};
