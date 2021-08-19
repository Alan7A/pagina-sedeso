const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validar-campos');
const validarJwt = require('../middlewares/validar-jwt');
const { createCentro, modifyCentro, deleteCentro, getCentroContigo } = require('../controllers/centros.controller');

const router = Router();

router.get('/:idp', getCentroContigo); // id del centro

router.post('/agregarCentro', validarJwt, 
    [
        check('nom', 'El nombre no puede estar vacio').notEmpty(),
        check('ub', 'Debes de agregar la ubicación del centro').notEmpty(),
        check('tel', 'El telefono no puede quedar vacio').notEmpty(),
        validarCampos
    ], createCentro);

router.put('/editar/:idp', validarJwt, 
    [
        check('nom', 'El nombre no puede estar vacio').notEmpty(),
        check('ub', 'Debes de agregar la ubicación del centro').notEmpty(),
        check('tel', 'El telefono no puede quedar vacio').notEmpty(),
        validarCampos
    ], modifyCentro);

router.delete('/eliminar/:idp', validarJwt, deleteCentro);

module.exports = router;
