const bcryptjs = require('bcrypt')
const db = require('../database/connection');
const { generarJWT } = require('../helpers/generar-jwt');


const login = async (req, res) => {
    const { email, contra } = req.body;

    try {
        // Consultar el usuario
        const [results] = await db.query('SELECT * FROM Usuarios WHERE correo = ?', [email]);
        let usuario = results[0];

        // Verificar si existe el usuario/email
        if (!usuario) {
            return res.status(404).json({
                errors: [{
                    msg: 'Email o contraseña incorrectos'
                }]
            })
        }

        // Verificar contraseña
        const validPassword = bcryptjs.compareSync(contra, usuario.contra);
        if (!validPassword) {
            return res.status(400).json({
                errors: [{
                    msg: 'Email o contraseña incorrectos'
                }]
            })
        }

        // Generar JWT
        const token = await generarJWT(usuario.idUsuario);

        // Quitar la contraseña al objeto usuario
        delete usuario.contra;

        res.json({
            usuario,
            token,
            msg: 'Usuario logueado correctamente'
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Error con la base de datos o el servidor',
            query: error.sql,
            sqlMessage: error.sqlMessage
        })
    }
}

const renovarToken = async (req, res) => {
    //Extraer uid de la req (se puso ahí en el middleware validar-kwt)
    const uid = req.uid;

    // Generar nuevo JWT
    const token = await generarJWT(uid)

    // Consultar el usuario
    const [results] = await db.query('SELECT idUsuario, coordinador, correo, idCentro  FROM Usuarios WHERE idUsuario = ?', [uid]);
    const usuario = results;

    res.json({
        usuario,
        token,
        msg: 'Token renovado correctamente'
    })
}

module.exports = {
    login,
    renovarToken
}