const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '7d'
        }, (err, token) => {
            if (err) {
                console.error(err);
                reject('No se pudo generar el token')
            } else {
                resolve(token);
            }
        })

    })
}

module.exports = {
    generarJWT
}
