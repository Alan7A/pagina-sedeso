const db = require('../database/connection');

const getCursosPorCentro = async (req, res) => {

    try{

        const { idc } = req.params; // idc = idCentroCrecer
        const [results] = await db.query('CALL ListCursosPorCentro(?)', [idc]);
        res.json(results);
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
        const curso = results[0][0];

        if(curso){
        
            res.json(curso);
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

    const { idc, nom, hor } = req.body;
    
    try {

        await db.query('CALL setCurso(?,?,?)', [idc, nom, hor]);
        res.status(201).json({
            msg: 'Curso creado exitosamente'
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
    const { idc, nom, hor } = req.body; // idcp = idCurso, idc = idCentroCrecer

    try {

        const [results] = await db.query('CALL updateCurso(?,?,?,?)', [idcp, idc, nom, hor])
        if (results.affectedRows === 0) {

            return res.status(400).json({
                msg: 'El curso a editar no existe'
            });
        }

        res.status(201).json({
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

        res.json({
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
    modifyCurso,
    deleteCurso,
    createCurso

}