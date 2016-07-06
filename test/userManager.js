/**
 * All functions and setup regarding authentification and authorization.
 * @module components/auth
 */
import jwt from 'jsonwebtoken';
import Promise from 'bluebird';
Promise.promisifyAll(jwt);

let jwtToken;

/**
 * createJwt - Creates a JWT.
 *
 * @param  {Object} payload                         json object
 * @param  {String} expiresIn = config.jwtExpiresIn string indicating how long the jwt is valid
 * @return {String}                                 The created jwt
 */
function createJwt(payload) {
    jwtToken = jwt.sign(payload, 'hemmelig', {
        expiresIn: '365d',
        subject: String(payload.id)
    });
}


export function getJwt() {
    return jwtToken;
}

export function setUser(user) {
    createJwt(user);
}
