const jwt = require('jsonwebtoken');

const secret = '9ed2eab92d11ac71a59de901d75c7a3d4ce6452e74ecc5581f2e6a5c445e4f07'; // 256
const expiresIn = '1h';

async function signJWT(object = {}) {
    const token = await jwt.sign(object, secret, {
        expiresIn,
    });
    return token;
}

async function verifyJWT(token) {
    const decoded = new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, _decoded) => {
            if (err) { resolve(null); }
            resolve(_decoded);
        });
    });
    return decoded;
}

module.exports = {
    signJWT,
    verifyJWT,
};
