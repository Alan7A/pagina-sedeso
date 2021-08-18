const db = require('../database/connection');

const getImgsPorCurso = async(req, res) => {

    const { idpc } = req.params; // id del Curso
    try {

        const [results] = await db.query('CALL ListImgCurso(?)', [idpc]);
        res.json(results);
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

const getImgDeCurso = async(req, res) => {

    const { id } = req.body; // id de la img

    try {

        const [img] = await db.query('CALL getImgCurso(?)', [id]);
        res.json(img[0]);
        
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

const createImgCurso = async(req, res) => {

    const { idpc } = req.params;
    const { img } = req.body;

    try {
        
        await db.query('CALL setImgCurso(?,?)', [idpc, img]);
        res.status(201).json({
            msg: "Imagen guardada exitosamente"
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

const modifyImgCurso = async(req, res) => {

    const { idpc } = req.params;
    const { id, imagen } = req.body;

    try {
        
        const [results] = await db.query('CALL updateImgCurso(?,?,?)', [id, idpc, imagen]);

        if (results.affectedRows === 0) {
            return res.status(400).json({
                msg: `La imagen con id: ${ id } no existe`
            });
        }

        res.status(202).json({
            msg:"La imagen se ha editado exitosamente"
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

const deleteImgCurso = async(req, res) => {

    const { id } = req.params; //id de la img

    try {
  
        const [results] = await db.query('CALL deleteImgCurso(?)', [id]);
        if (results.affectedRows === 0) {
            return res.status(400).json({
                msg: `La imagen con id: ${ id } no existe`
            });
        }

        res.status(202).json({
            msg:"La imagen se ha eliminado exitosamente"
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

module.exports = {

    getImgsPorCurso,
    getImgDeCurso,
    createImgCurso,
    modifyImgCurso,
    deleteImgCurso

}