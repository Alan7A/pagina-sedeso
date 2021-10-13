const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validar-campos');
const { createProducto,    deleteProducto,    modifyProducto,
createResponsable, deleteResponsable, modifyResponsable, getResponsables } = require('../controllers/productos.controller');

const router = Router();

router.post('/agregar', 
    [
       check('producto', 'Debe de tener nombre el producto' ).notEmpty(),
       validarCampos
    ], createProducto);

router.delete('/eliminar/:idProducto',deleteProducto);

router.put('/editar/:idProducto', 
    [
        check('producto', 'Debe de tener nombre el producto' ).notEmpty(),
        validarCampos  
    ], modifyProducto);


router.post('/agregarResponsable/:idEntregado',
    [
        check('responsable', 'Debes de escribir el nombre del centro contigo o de la persona' ).notEmpty(),
        validarCampos 
    ], createResponsable);

router.delete('/eliminarResponsable/:idResponsable', deleteResponsable);

router.put('/editarResponsable/:idResponsable',
    [
        check('responsable', 'Debes de escribir el nombre del centro contigo o de la persona' ).notEmpty(),
        validarCampos
    ], modifyResponsable );

router.get('/responsables/:idEntregado', getResponsables);


module.exports = router;