// Este middleware sive para protejer rutas, o sea que
// tiene que estar un usuario logueado para hacer uso de la ruta protegida
const jwt = require('jsonwebtoken');

module.exports = validarJWT = (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            errors: [{
                msg: 'No hay token en la petición'
            }]
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        if (uid) {
            // Todo bien con el token        
            req.uid = uid;
            next();
        }

    } catch (error) {
        console.log(error);
        res.status(401).json({
            errors: [{
                msg: 'Token no válido'
            }]
        });
    }
}