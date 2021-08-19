const db = require('../database/connection');

const getCentroContigo = async(req, res) => {

    const { idp } = req.params; // idp = idCentro

    try {
        
        const [results] = await db.query('CALL getCentro(?)', [idp]);
        const centro = results[0][0];

        if(centro){

            res.json(centro);
        }else{

            res.status(404).json({
                msg:'Centro Contigo no encontrado'
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

const getAllCentros = async(req, res) => {

    try {
        
        const [centros] = await db.query('CALL ListCentros()');
        res.json(centros);

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

const createCentro = async(req, res) => {

    const { nom, ub, tel } = req.body;

    try {

        await db.query('CALL setCentro(?,?,?)', [nom, ub, tel]);
        res.status(201).json({
            msg:"Centro agregado exitosamente"
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

const modifyCentro = async(req, res) => {

    const { idp } = req.params; // idp = idCentro
    const { nom, tel, ub } = req.body;

    try {
        
        const [results] = await db.query('CALL updateCentro(?,?,?,?)', [idp, nom, ub, tel]);
        if (results.affectedRows === 0) {

            return res.status(400).json({
                msg: 'El Centro Contigo a editar no existe'
            });
        }

        res.status(202).json({
            msg: 'El Centro Contigo se ha editado correctamente',
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

const deleteCentro = async(req, res) => {

    const { idp } = req.params;

    try {
        
        const [results] = await db.query('CALL deleteCentro(?)', [idp]);

        if (results.affectedRows === 0) {

            return res.status(400).json({
                msg: 'El Centro a eliminar no existe'
            });
        }

        res.json({
            msg:'El Centro Contigo se ha eliminado exitosamente'
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

    getCentroContigo,
    createCentro,
    modifyCentro,
    deleteCentro,
    getAllCentros
}