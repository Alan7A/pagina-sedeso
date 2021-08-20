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

    try{

        const { idc } = req.params; // idc = idCentroCrecer
        const [results] = await db.query('CALL ListCursosPorCentro(?)', [idc]);
        const [cursos] = results.slice(0, results.length);
        res.status(202).json(cursos);

    } catch ( error ){

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
        const curso = results[0][0];
        curso.horarios = horarios;

        if(curso){        
            res.status(202).json(curso);
        } else {

            res.status(404).json({
                msg:'Curso no encontrado'
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

const createCurso = async(req, res) => {

    const { idc, nom, lug, alu } = req.body;
    
    try {

        const [results] = await db.query('CALL setCurso(?,?,?,?)', [idc, nom, lug, alu]);
        res.status(201).json({
            msg: 'Curso creado exitosamente',
            idCurso: results.insertId
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

const modifyCurso = async(req, res) => {

    const { idcp } = req.params;
    const { idc, nom, lug, alu } = req.body; // idcp = idCurso, idc = idCentroCrecer

    try {

        const [results] = await db.query('CALL updateCurso(?,?,?,?, ?)', [idcp, idc, nom, lug, alu])
        if (results.affectedRows === 0) {

            return res.status(400).json({
                msg: 'El curso a editar no existe'
            });
        }

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
            msg:'El curso se ha eliminado exitosamente'
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