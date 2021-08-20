const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validar-campos');
const validarJwt = require('../middlewares/validar-jwt');
const { createImgCurso, modifyImgCurso, getImgDeCurso, deleteImgCurso, getImgsPorCurso, updateImagenesCurso, createImagenesCurso } = require('../controllers/cursosImg.controller');

const router = Router();

router.get('/imagenes/:idpc', getImgsPorCurso); // id del Curso

router.get('/:id', getImgDeCurso); // id de la Imagen

router.post('/agregarImg/:idpc', validarJwt, 
    [
        check('img', 'No hay imagen para agregar').notEmpty(),
        validarCampos
    ],
    createImgCurso);

router.put('/editar/:idpc', validarJwt, 
    [
        check('img', 'No hay imagen para editar').notEmpty(),
        check('id', 'No hay id de la img').notEmpty(),
        validarCampos
    ], modifyImgCurso);

router.delete('/eliminar/:id', validarJwt, deleteImgCurso);

router.post('/agregarImagenes/:idCurso', validarJwt, createImagenesCurso)

router.post('/actualizar/:idCurso', validarJwt, updateImagenesCurso);

module.exports = router;