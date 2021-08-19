const db = require('../database/connection');

const getImgCentro = async(req, res) => {

    const { id } = req.params; // id de la Imagen

    try {
        
        const [img] = await db.query('CALL getImgCentro(?)', [id]);
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

const getImgsPorCentro = async(req, res) => {

    const { idc } = req.params; // id del Centro

    try {
        
        const [results] = await db.query('CALL ListImgCentro(?)', [idc]);
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

const modifyImgCentro = async(req, res) => {

    const { idc } = req.params;
    const { id, img } = req.body;

    try {
        
        const [results] = await db.query('CALL updateImgCentro(?,?,?)', [id, idc, img]);

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

const createImgCentro = async(req, res) => {

    const { idc } = req.params; // id del Centro
    const { img } = req.body;

    try {
        
        await db.query('CALL setImgCentro(?,?)', [idc, img]);

        res.status(201).json({
            msg:"La imagen se ha agregado exitosamente"
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

const deleteImgCentro = async(req, res) => {

    const { id } = req.params;

    try {
        
        const [results] = await db.query('CALL deleteImgCentro(?)', [id]);
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
    
    getImgCentro,
    getImgsPorCentro,
    modifyImgCentro,
    createImgCentro,
    deleteImgCentro
}