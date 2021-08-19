const bcrypt = require('bcrypt');
const db = require('../database/connection');

const getUsers = async (req, res) => {
    try {
        const [results] = await db.query('CALL getUsers()');
        res.json(results[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: [{
                msg: 'Error con la base de datos o el servidor'
            }],
            query: error.sql,
            sqlMessage: error.sqlMessage
        });
    }
}

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;
        const [results] = await db.query('CALL getUser(?)', [email]);

        const usuario = results[0][0];

        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({
                msg: 'Usuario no encontrado'
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: [{
                msg: 'Error con la base de datos o el servidor'
            }],
            query: error.sql,
            sqlMessage: error.sqlMessage
        });
    }
}

const createUser = async (req, res) => {
    let { idCentro, coordinador, email, contra } = req.body;

    try {
        // Encriptar contraseña
        salt = bcrypt.genSaltSync();
        contra = bcrypt.hashSync(contra, salt);

        // Insertar usuario a la DB
        await db.query('CALL setUser(?, ?, ?, ?)', [idCentro, coordinador, email, contra]);
        res.status(201).json({
            msg: 'Usuario creado correctamente',
        })
    } catch (error) {
        // Si el email ya existe, se manda el error
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                errors: [{
                    msg: 'Ese email ya está registrado'
                }]
            });
        }

        console.error(error);
        return res.status(500).json({
            errors: [{
                msg: 'Error con la base de datos o el servidor'
            }],
            query: error.sql,
            sqlMessage: error.sqlMessage
        });
    }
}

const modifyUser = async (req, res) => {
    const { id } = req.params;
    let { idCentro, coordinador, email, contra } = req.body;

    try {
        // Encriptar contraseña
        salt = bcrypt.genSaltSync();
        contra = bcrypt.hashSync(contra, salt);

        const [results] = await db.query('CALL updateUser(?, ?, ?, ?, ?)', [id, idCentro, coordinador, email, contra]);

        // Si no se modificó ninguna fila, significa que el usuario no existe
        if (results.affectedRows === 0) {
            return res.status(400).json({
                msg: 'El usuario a modificar no existe'
            });
        }

        res.status(201).json({
            msg: 'Usuario modificado correctamente',
        })

    } catch (error) {
        // Si el email ya existe, se manda el error
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                errors: [{
                    msg: 'Ese email ya está registrado'
                }]
            });
        }

        console.error(error);
        return res.status(500).json({
            errors: [{
                msg: 'Error con la base de datos o el servidor'
            }],
            query: error.sql,
            sqlMessage: error.sqlMessage
        });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const [results] = await db.query('CALL deleteUser(?)', [id]);

        // Si no se modificó ninguna fila, significa que el usuario no existe
        if (results.affectedRows === 0) {
            return res.status(400).json({
                msg: 'El usuario a eliminar no existe'
            });
        }

        res.json({
            msg: 'Usuario eliminado correctamente'
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errors: [{
                msg: 'Error con la base de datos o el servidor'
            }],
            query: error.sql,
            sqlMessage: error.sqlMessage
        });
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    modifyUser,
    deleteUser
}