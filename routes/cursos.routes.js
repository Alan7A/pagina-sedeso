const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validar-campos');
const validarJwt = require('../middlewares/validar-jwt');
const { getCursosPorCentro, getCurso, createCurso, deleteCurso, modifyCurso } = require('../controllers/cursos.controller');

const router = Router();

router.get('/Cursos/:idc', getCursosPorCentro); // idc = idCentroCrecer

router.get('/:idcp', getCurso); // idcp = idCurso

router.post('/crearCurso', validarJwt, 
    [
        check('nom', 'El nombre del curso esta vacio').notEmpty(),
        validarCampos
    ], 
    createCurso);

router.put('/modificarCurso/:idcp', validarJwt, 
    [
        check('nom', 'El nombre del curso esta vacio').notEmpty(),
        validarCampos
    ], 
    modifyCurso);

router.delete('/eliminarCurso/:idcp', validarJwt,  deleteCurso);

module.exports = router;