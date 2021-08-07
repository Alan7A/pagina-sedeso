const bcrypt = require('bcrypt');
const db = require('../database/connection');

const getUsuarios = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM Usuarios');
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error con la base de datos',
            query: error.sql
        })
    }
}

const getUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const [results] = await db.query('CALL getUser(?)', [id]);

        const usuario = results[0][0];

        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({
                msg: 'Usuario no encontrado'
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error con la base de datos',
            query: error.sql
        })
    }
}

const createUsuario = async (req, res) => {
    let { idCentro, coordinador, email, contra } = req.body;

    try {
        // Encriptar contraseña
        salt = bcrypt.genSaltSync();
        contra = bcrypt.hashSync(contra, salt);

        // Insertar usuario a la DB
        const [results] = await db.query('CALL setUser(?, ?, ?, ?)', [idCentro, coordinador, email, contra]);
        res.status(201).json({
            msg: 'Usuario creado correctamente',
        })
    } catch (error) {
        // Si el correo ya existe, se manda el error
        if(error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                error: 'Ese correo ya está registrado'
            })
        }

        console.error(error);
        return res.status(500).json({
            msg: 'Error con la base de datos',
            query: error.sql
        })
    }
}

module.exports = {
    getUsuarios,
    getUsuario,
    createUsuario
}