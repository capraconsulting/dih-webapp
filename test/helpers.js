/**
 * Support functions for tests
 * @module test/helpers
 */
import jwt from 'jsonwebtoken';
import * as users from './fixtures/users.json';

export function getUserObject(role) {
    const ROLES = ['USER', 'ADMIN', 'MODERATOR'];
    const roleIndex = ROLES.indexOf(role.toUpperCase());
    if (roleIndex !== -1) {
        return users[roleIndex];
    }
    throw new Error('Invaid role');
}

/**
 * createJwt - Creates a JWT.
 *
 * @param  {Object} payload                         json object
 * @param  {String} expiresIn = config.jwtExpiresIn string indicating how long the jwt is valid
 * @return {String}                                 The created jwt
 */
export function createJwt(payload) {
    return jwt.sign(payload, 'hemmelig', {
        expiresIn: '365d',
        subject: String(payload.id)
    });
}
