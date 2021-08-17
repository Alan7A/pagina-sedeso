const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validar-campos');
const { getCursosPorCentro, getCurso, createCurso, deleteCurso, modifyCurso } = require('../controllers/cursos.controller');

const router = Router();

router.get('/Cursos/:idc', getCursosPorCentro); // idc = idCentroCrecer

router.get('/:idcp', getCurso); // idcp = idCurso

router.post('/crearCurso',
    [
        check('nom', 'El nombre del curso esta vacio').notEmpty(),
        validarCampos
    ], 
    createCurso);

router.put('/modificarCurso/:idcp', 
    [
        check('nom', 'El nombre del curso esta vacio').notEmpty(),
        validarCampos
    ], 
    modifyCurso);

router.delete('/eliminarCurso/:idcp', deleteCurso);

module.exports = router;