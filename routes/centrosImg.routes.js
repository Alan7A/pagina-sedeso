const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validar-campos');
const validarJwt = require('../middlewares/validar-jwt');
const { createImgCentro, modifyImgCentro, getImgsPorCentro, getImgCentro, deleteImgCentro } = require('../controllers/centrosImg.controller');

const router = Router();

router.get('/imagenes/:idc', getImgsPorCentro); // id del Curso

router.get('/:id', getImgCentro);

router.post('/agregar/:idc', validarJwt, 
    [
        check('img', 'No hay imagen para agregar').notEmpty(),
        validarCampos
    ], createImgCentro);

router.put('/editar/:idc', validarJwt,  //id del Centro
    [
        check('img', 'No hay imagen para agregar').notEmpty(),
        validarCampos
    ], modifyImgCentro);
    
router.delete('/eliminar/:id', validarJwt, deleteImgCentro); // id de la Imagen

module.exports = router;