const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validar-campos');
const { createCentro, modifyCentro, deleteCentro, getCentroContigo } = require('../controllers/centros.controller');

const router = Router();

router.get('/:idp', getCentroContigo); // id del centro

router.post('/agregarCentro', 
    [
        check('nom', 'El nombre no puede estar vacio').notEmpty(),
        check('ub', 'Debes de agregar la ubicación del centro').notEmpty(),
        check('tel', 'El telefono no puede quedar vacio').notEmpty(),
        validarCampos
    ], createCentro);

router.put('/editar/:idp', 
    [
        check('nom', 'El nombre no puede estar vacio').notEmpty(),
        check('ub', 'Debes de agregar la ubicación del centro').notEmpty(),
        check('tel', 'El telefono no puede quedar vacio').notEmpty(),
        validarCampos
    ], modifyCentro);

router.delete('/eliminar/:idp', deleteCentro);

module.exports = router;
