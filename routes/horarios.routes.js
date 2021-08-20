const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validar-campos');
const validarJwt = require('../middlewares/validar-jwt');
const { createHorario, modifyHorario, deleteHorario, getHorario, getAllHorarios, updateHorarios } = require('../controllers/horarios.controller');

const router = Router();

router.get('/:idh', getHorario); // id del Horario

router.get('/todos/:idcp', getAllHorarios); //id del Curso

router.delete('/eliminar/:idh', validarJwt, deleteHorario);

router.post('/agregar/:idcp', validarJwt, 
    [
       check('d', 'El dia no puede estar vacio' ).notEmpty(),
       check('h', 'Deben de especificarse las horas').notEmpty(),
       validarCampos
    ], createHorario);

router.put('/editar/:idcp', validarJwt,
    [
       check('idh', 'El id del horario no se encuentra').notEmpty(), 
       check('d', 'El dia no puede estar vacio' ).notEmpty(),
       check('h', 'Deben de especificarse las horas').notEmpty(),
       validarCampos
    ], modifyHorario);

router.post('/actualizar/:idCurso', validarJwt, updateHorarios);

module.exports = router;