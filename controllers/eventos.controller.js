const db = require('../database/connection');

const createEvento = async( req, res) => {

    let { idc, nom, lug, hor, desc, imagenes } = req.body;

    try {
        
        const [results] = await db.query('INSERT INTO Eventos(idCentro, nombreEvento, lugar, horario, descripcion) VALUES (?,?,?,?,?)', [idc, nom, lug, hor, desc]);
        const idEvento = results.insertId;

        //Agregar el idEvento a cada imagen del arreglo
        imagenes = imagenes.map((imagen) => ([
            ...imagen, idEvento
        ]));

        if (imagenes.length > 0) {
            await db.query('INSERT INTO ImagenesEvento(imagen, idEvento) VALUES ?', [imagenes]);
        }

        res.status(201).json({
            msg: 'Evento agregado exitosamente',
            idCurso: results.insertId,
            imagenes
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

const modifyEvento = async(req, res) => {

    const { ide } = req.params;
    const { nom, lug, hor, desc, imagenes } = req.body;

    try {
        
        const [results] = await db.query('CALL updateEvento(?,?,?,?,?)', [ide, nom, lug, hor, desc])
        if (results.affectedRows === 0) {

            return res.status(400).json({
                msg: 'El evento a editar no existe'
            });
        }

        if(imagenes.length > 0){

            // Borrar todas las imágenes de ese curso
            await db.query('DELETE FROM ImagenesEvento WHERE idEvento = ?', [ide]);
            // Insertar las nuevas imágenes a la tabla ImagenesCurso
            await db.query('INSERT INTO ImagenesEvento(idEvento, imagen) VALUES ?', [imagenes]);
        }
        

        res.status(202).json({
            msg: 'El evento se ha editado correctamente',
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

const deleteEvento = async (req, res) => {

    const { ide } = req.params;
    try {

        const [results] = await db.query('CALL deleteEvento(?)', [ide]);

        if (results.affectedRows === 0) {

            return res.status(400).json({
                msg: 'El evento a eliminar no existe'
            });
        }

        res.status(202).json({
            msg: 'El evento se eliminó exitosamente'
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

const getEvento = async(req, res) => {

    const { ide } = req.params;

    try {

        const [results] = await db.query('CALL getEvento(?)', [ide]);
        const [imagenes] = await db.query('CALL ListImgEvento(?)', [ide]);

        const evento = results[0][0];

        if(imagenes){
            evento.imagenes = imagenes[0];
        }
        

        if (evento) {
            res.status(202).json(evento);
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

const getEventosGeneral = async(req, res) => {

    try {
        
        const [results] = await db.query('CALL ListEventosGeneral()');
        const [eventos] = results.slice(0, results.length);
        const [resu] = await db.query('CALL NombreCentros()');
        const [centros] = resu.slice(0, resu.length); // regresa el nombre de los centros para poder tener el menú desplegable

        if (eventos.length > 0) {
            let nuevos = [];
            let contador = 0;

            eventos.forEach(async (evento, i, array) => {
                try {
                    const [imagen] = await db.query('SELECT imagen FROM ImagenesEvento WHERE idEvento=(?) limit 1', [evento.idEvento]);
                    
                    let nuevoEvento = evento;
                    if(imagen.length > 0) nuevoEvento.imagen = imagen[0].imagen
                    nuevos.push(nuevoEvento)

                    contador++;
                } catch (error) {
                    console.log(error);
                }


                if (contador === array.length) {
                    const eventosOrdenados = nuevos.sort((a, b) => {
                        if (a.nombreEvento > b.nombreEvento) {
                            return 1;
                        }
                        if (a.nombreEvento < b.nombreEvento) {
                            return -1;
                        }
                        // a must be equal to b
                        return 0;
                    })
                    
                    eventosOrdenados.push(centros);
                    res.status(202).json(eventosOrdenados);
                }
            })
        } else {
            res.json([])
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

const getEventosPorCentro = async(req, res) => {

    const { idc } = req.params; // idc = idCentroCrecer
    try {

        const [results] = await db.query('CALL ListEventosPorCentro(?)', [idc]);
        let [eventos] = results.slice(0, results.length);

        if (eventos.length > 0) {
            let nuevos = [];
            let contador = 0;

            eventos.forEach(async (evento, i, array) => {

                try {

                    const [imagen] = await db.query('SELECT imagen FROM ImagenesEvento WHERE idEvento=(?) limit 1', [evento.idEvento]);
                    let nuevoEvento = evento;
                    if(imagen.length > 0) nuevoEvento.imagen = imagen[0].imagen
                    nuevos.push(nuevoEvento)

                    contador++;
                } catch (error) {
                    console.log(error);
                }


                if (contador === array.length) {
                    const eventosOrdenados = nuevos.sort((a, b) => {
                        if (a.nombreEvento > b.nombreEvento) {
                            return 1;
                        }
                        if (a.nombreEvento < b.nombreEvento) {
                            return -1;
                        }
                        // a must be equal to b
                        return 0;
                    })

                    res.status(202).json(eventosOrdenados);
                }
            })
        } else {
            res.json([])
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

module.exports = {

    createEvento,
    modifyEvento,
    deleteEvento,
    getEvento,
    getEventosGeneral,
    getEventosPorCentro

}