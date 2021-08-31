const db = require('../database/connection');

const getCursosGeneral = async (req, res) => {

    try {

        const [results] = await db.query('CALL ListCursosGeneral()');
        const [cursos] = results.slice(0, results.length);
        res.status(201).json(cursos);
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


const getCursosPorCentro = async (req, res) => {

    try {

        const { idc } = req.params; // idc = idCentroCrecer
        const [results] = await db.query('CALL ListCursosPorCentro(?)', [idc]);
        const [cursos] = results.slice(0, results.length);
        res.status(202).json(cursos);

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

const getCurso = async (req, res) => {

    try {

        const { idcp } = req.params;
        const [results] = await db.query('CALL getCurso(?)', [idcp]);
        const [horarios] = await db.query('CALL getAllHorarios(?)', [idcp]);
        const [imagenes] = await db.query('CALL ListImgCurso(?)', [idcp]);

        const curso = results[0][0];
        curso.horarios = horarios[0];
        curso.imagenes = imagenes[0];

        if (curso) {
            res.status(202).json(curso);
        } else {

            res.status(404).json({
                msg: 'Curso no encontrado'
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

const createCurso = async (req, res) => {

    let { idc, nom, lug, alu, horarios, imagenes } = req.body;


    try {

        const [results] = await db.query('INSERT INTO Cursos(idCentro, nombre, lugar, alumnos) VALUES (?,?,?,?)', [idc, nom, lug, alu]);
        const idCurso = results.insertId;

        //Agregar el idCurso a cada horario del arreglo
        horarios = horarios.map((horario) => ([
            ...horario, idCurso
        ]));

        //Agregar el idCurso a cada imagen del arreglo
        imagenes = imagenes.map((imagen) => ([
            ...imagen, idCurso
        ]));

        //Instertar los horarios
        await db.query('INSERT INTO Horarios(dia, horas, idCurso) VALUES ?', [horarios]);
        //Insertar las imágenes
        await db.query('INSERT INTO ImagenesCurso(imagen, idCurso) VALUES ?', [imagenes]);

        res.status(201).json({
            msg: 'Curso creado exitosamente',
            idCurso: results.insertId,
            horarios, imagenes
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

const modifyCurso = async (req, res) => {

    const { idcp } = req.params;
    const { idc, nom, lug, alu, imagenes, horarios } = req.body; // idcp = idCurso, idc = idCentroCrecer


    try {

        const [results] = await db.query('CALL updateCurso(?,?,?,?, ?)', [idcp, idc, nom, lug, alu])
        if (results.affectedRows === 0) {

            return res.status(400).json({
                msg: 'El curso a editar no existe'
            });
        }

        // Borrar todos los horarios de ese curso
        await db.query('CALL deleteAllHorarios(?)', [idcp]);
        // Insertar los nuevos horarios a la tabla horarios
        await db.query('INSERT INTO Horarios(dia, horas, idCurso) VALUES ?', [horarios]);

        // Borrar todas las imágenes de ese curso
        await db.query('DELETE FROM ImagenesCurso WHERE idCurso = ?', [idcp]);
        // Insertar las nuevas imágenes a la tabla ImagenesCurso
        await db.query('INSERT INTO ImagenesCurso(idCurso, imagen) VALUES ?', [imagenes]);


        res.status(202).json({
            msg: 'El curso se ha editado correctamente',
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

const deleteCurso = async (req, res) => {

    const { idcp } = req.params;
    try {

        const [results] = await db.query('CALL deleteCurso(?)', [idcp]);

        if (results.affectedRows === 0) {

            return res.status(400).json({
                msg: 'El curso a eliminar no existe'
            });
        }

        res.status(202).json({
            msg: 'El curso se ha eliminado exitosamente'
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

    getCurso,
    getCursosPorCentro,
    getCursosGeneral,
    modifyCurso,
    deleteCurso,
    createCurso

}