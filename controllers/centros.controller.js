const db = require('../database/connection');

const getCentroContigo = async(req, res) => {

    const { idp } = req.params; // idp = idCentro

    try {
        
        const [results] = await db.query('CALL getCentro(?)', [idp]);
        const [imagenes] = await db.query('CALL ListImgCentro(?)', [idp]);

        const centro = results[0][0];
        centro.imagenes = imagenes[0];
        

        if(centro){

            res.status(200).json(centro);
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
        
        const [results] = await db.query('CALL ListCentros()');
        const [centros] = results.slice(0, results.length);
        res.status(202).json(centros);

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

const getCentrosSinUsuarios = async(req, res) => {

    try {
        
        const [results] = await db.query('CALL getCentrosNoUsers()');
        res.status(202).json(results[0]);
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

    let { nom, ub, tel, imagenes } = req.body;

    try {

        const [results] = await db.query('INSERT INTO CentroCrecer(nombreCentro, ubicacion ,telefono) VALUES (?, ?, ?)', [nom, ub, tel]);
        const idCentro = results.insertId;

        //Agregar el idCentro a cada imagen del arreglo
        imagenes = imagenes.map( (imagen)=> ([
            ...imagen, idCentro
        ]) );

        if(imagenes.length>0){
        //Insertar las imágenes
        await db.query('INSERT INTO ImagenesCentro(imagen, idCentro) VALUES ?', [imagenes]);
        }

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
    const { nom, tel, ub, imagenes } = req.body;

    try {
        
        const [results] = await db.query('CALL updateCentro(?,?,?,?)', [idp, nom, ub, tel]);
        if (results.affectedRows === 0) {

            return res.status(400).json({
                msg: 'El Centro Contigo a editar no existe'
            });
        }

        // Borrar todas las imágenes de ese curso
        await db.query('DELETE FROM ImagenesCentro WHERE idCentro = ?', [idp]);
        // Insertar las nuevas imágenes a la tabla ImagenesCurso
        await db.query('INSERT INTO ImagenesCentro(idCentro, imagen) VALUES ?', [imagenes]);

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

        res.status(202).json({
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
    getAllCentros,
    getCentrosSinUsuarios
}