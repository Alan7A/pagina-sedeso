const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validar-campos');
const validarJwt = require('../middlewares/validar-jwt');
const { getEvento, getEventosPorCentro, getEventosGeneral, createEvento, modifyEvento, deleteEvento } = require('../controllers/eventos.controller');

const router = Router();

router.get('/todos', getEventosGeneral);

router.get('/:ide', getEvento); // ide = idEvento

router.get('/porCentro/:idc', getEventosPorCentro); // idc = idCentroCrecer

router.post('/crearEvento', validarJwt,
    [
        check('idc', 'No estás incluyendo el idCentro').notEmpty(),
        check('nom', 'No puedes crear un evento sin nombre').notEmpty(),
        validarCampos
    ], createEvento);

router.put('/editarEvento/:ide', validarJwt,
    [
        check('nom', 'No puedes dejar un evento sin nombre').notEmpty(),
        validarCampos
    ], modifyEvento);

router.delete('/eliminarEvento/:ide', validarJwt, deleteEvento);

module.exports = router;