const db = require('../database/connection');

const getMainImgs = async (req, res) => {

    try {

        const [imagenes] = await db.query('CALL getImagenesPrincipales()');
        res.status(202).json(imagenes[0]);

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


const updateMainImgs = async(req, res) => {

    let {imagenes} = req.body;

    try {

        //Agregar el idCurso a cada imagen del arreglo
        imagenes = imagenes.map((imagen) => ([
            ...imagen, 2
        ]));
        
        //Se eliminan las imágenes primero
        await db.query('DELETE FROM ImagenesCentro WHERE idCentro = 2');
        //Se insertan las nuevas imágenes
        await db.query('INSERT INTO ImagenesCentro(imagen, idCentro) VALUES ?', [imagenes]);

        res.status(202).json({
            msg:'Imágenes guardadas exitosamente'
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
    
    getMainImgs,
    updateMainImgs,

}