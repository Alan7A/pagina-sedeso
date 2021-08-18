const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validar-campos');
const { createImgCurso, modifyImgCurso, getImgDeCurso, deleteImgCurso, getImgsPorCurso } = require('../controllers/cursosImg.controller');

const router = Router();

router.get('/imagenes/:idpc', getImgsPorCurso); // id del Curso

router.get('/', getImgDeCurso); // id de la Imagen

router.post('/agregarImg/:idpc', 
    [
        check('img', 'No hay imagen para agregar').notEmpty(),
        validarCampos
    ],
    createImgCurso);

router.put('/editar/:idpc', [
    check('img', 'No hay imagen para editar').notEmpty(),
    check('id', 'No hay id de la img').notEmpty(),
    validarCampos
], modifyImgCurso);

router.delete('/eliminar/:id', deleteImgCurso);

module.exports = router;