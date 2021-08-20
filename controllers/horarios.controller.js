const db = require('../database/connection');

const getHorario = async (req, res) => {

    const { idh } = req.params; // id del Horario

    try {

        const [results] = await db.query('CALL getHorario(?)', [idh]);
        const hor = results[0][0];

        if (hor) {

            res.json(hor);
        } else {

            res.status(404).json({
                msg: "Horario no encontrado"
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

const deleteHorario = async (req, res) => {

    const { idh } = req.params;

    try {

        const [results] = await db.query('CALL deleteHorario(?)', [idh]);
        if (results.affectedRows === 0) {

            return res.status(400).json({
                msg: 'El horario a eliminar no existe'
            });
        }

        res.json({
            msg: 'El horario se ha eliminado exitosamente'
        });
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

const createHorario = async (req, res) => {

    const { idcp } = req.params;// id del Curso
    const { d, h } = req.body;

    try {

        await db.query('CALL setHorario(?,?,?)', [idcp, d, h]);
        res.status(201).json({
            msg: "El horario se ha creado exitosamente"
        });
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

const modifyHorario = async (req, res) => {

    const { idcp } = req.params;
    const { idh, d, h } = req.body;

    try {

        const [results] = await db.query('CALL updateHorario(?,?,?, ?)', [idh, idcp, d, h]);

        if (results.affectedRows === 0) {
            return res.status(400).json({
                msg: `El horario con id: ${idh} no existe`
            });
        }

        res.status(202).json({
            msg: "El horario se ha editado exitosamente"
        });
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

const updateHorarios = async (req, res) => {
    const { idCurso } = req.params;
    const horarios = req.body;

    try {
        // Borrar todos los horarios de ese curso
        await db.query('DELETE FROM Horarios WHERE idCurso = ?', [idCurso]);
        // Insertar los nuevos horarios a la tabla horarios
        await db.query('INSERT INTO Horarios(dia, horas, idCurso) VALUES ?', [horarios]);
        
        res.json({
            msg: 'Horarios actualizados correctamente',

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

    getHorario,
    modifyHorario,
    deleteHorario,
    createHorario,
    updateHorarios
}
