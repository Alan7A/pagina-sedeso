const { Result } = require('express-validator');
const db = require('../database/connection');

const createProducto = async(req,res) => {

    let { producto, observaciones = "" } = req.body;

    try {
        
        const [results] = await db.query('INSERT INTO Productos(producto, observaciones) VALUES (?,?)', [producto, observaciones]);
        const idProducto = results.insertId; //Creamos el producto

        //Inicializamos los 12 meses del producto en 0 (entregados y programados)
        await db.query('CALL set12Meses(?)', [idProducto]);

        res.status(202).json({
            msg:"Se ha creado el producto exitosamente",
            idProducto
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

const modifyProducto = async(req, res) => {

    const { idProducto } = req.params;

    const { producto, observaciones = "" } = req.body;

    try {
        
        const [results] = await db.query('CALL modifyProducto(?,?,?)', [idProducto, producto, observaciones]);
        if (results.affectedRows === 0) {

            return res.status(400).json({
                msg: 'El producto a editar no existe'
            });
        }

        const [resul] = await db.query('CALL getProductAct(?)', [idProducto]);
        const [product] = resul.slice(0, resul.length);

        res.status(202).json({
            msg: `El producto: ${producto} se ha editado exitosamente`,
            product
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

const modifyMesEntregado = async(req, res) => {

    const { idProducto } = req.params;
    const { idMes, cantidad } = req.body;

    try{

        const [results] = await db.query('CALL modifyMesEntregado(?, ?, ?)', [idProducto, idMes, cantidad]);
        if (results.affectedRows === 0) {

            return res.status(400).json({
                msg: 'El mes a editar no existe'
            });
        }

        res.status(202).json({
            msg:`Se ha editado la cantidad del mes ${idMes} exitosamente`
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

const modifyMesProgramado = async(req, res) => {

    const { idProducto } = req.params;
    const { idMes, cantidad } = req.body;

    try{

        const [results] = await db.query('CALL modifyMesProgramado(?, ?, ?)', [idProducto, idMes, cantidad]);
        if (results.affectedRows === 0) {

            return res.status(400).json({
                msg: 'El mes a editar no existe'
            });
        }

        res.status(202).json({
            msg:`Se ha editado la cantidad del mes ${idMes} exitosamente`
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

const deleteProducto = async(req,res) => {

    const { idProducto } = req.params;

    try {
        
        const [results] = await db.query('CALL deleteProducto(?)', [idProducto]);

        if (results.affectedRows === 0) {

            return res.status(400).json({
                msg: 'El producto a eliminar no existe'
            });
        }

        res.status(202).json({
            msg: 'El producto se ha eliminado exitosamente'
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

const getProducto = async(req, res) => {

    const { idProducto } = req.params;

    try {
        
        const [results] = await db.query('CALL getProductAct(?)', [idProducto]);
        const [productos] = results.slice(0, results.length);
        res.status(201).json(productos);

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

const ListProductos = async(req, res) => {

    try {
        
        const [results] = await db.query('CALL ListProductos()');
        const [productos] = results.slice(0, results.length);
        res.status(201).json(productos);

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

const createResponsable = async(req,res) => {

    const { idEntregado } = req.params;
    const { responsable } = req.body;

    try {

        await db.query('CALL setResponsable(?,?)', [idEntregado, responsable]);

        res.status(202).json({
            msg:"Responsable agregado exitosamente"
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

const modifyResponsable = async(req, res) => {

    const { idResponsable } = req.params;
    const { responsable }   = req.body;

    try {
        
        const [results] = await db.query('CALL modifyResponsable(?,?)', [idResponsable, responsable]);
        if( results.affectedRows === 0){

            return res.status(400).json({
                msg: "El responsable a editar no existe"
            })
        }

        res.status(202).json({
            msg:"Se ha editó el responsable exitosamente"
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

const deleteResponsable = async (req, res) => {

    const { idResponsable } = req.params;

    try {
        
        const [results] = await db.query('CALL deleteResponsable(?)', [idResponsable]);

        if (results.affectedRows === 0) {

            return res.status(400).json({
                msg: 'El responsable a eliminar no existe'
            });
        }

        res.status(202).json({
            msg: 'El responsable se ha eliminado exitosamente'
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

const getResponsables = async(req, res) => {

    const { idEntregado } = req.params; //idEntregado (id del mes del producto)

    try {
        
        const [results] = await db.query('CALL getResponsables(?)', [idEntregado]); //Busca todos los responsables de ese mes
        const [responsables] = results.slice(0, results.length);
        res.status(202).json(responsables);

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

    createProducto,
    modifyProducto,
    deleteProducto,
    createResponsable,
    modifyResponsable,
    deleteResponsable,
    getResponsables,
    getProducto,
    ListProductos,
    modifyMesEntregado,
    modifyMesProgramado
}