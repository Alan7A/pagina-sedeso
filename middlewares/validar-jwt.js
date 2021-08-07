// Este middleware sive para protejer rutas, o sea que
// tiene que estar un usuario logueado para hacer uso de la ruta protegida
const jwt = require('jsonwebtoken');

module.exports = validarJWT = (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        const datosToken = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        // Todo bien con el token        
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}