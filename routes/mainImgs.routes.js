const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validar-campos');
const validarJwt = require('../middlewares/validar-jwt');
const { getMainImgs, setMainImgs, updateMainImgs} = require('../controllers/mainImages.controller');

const router = Router();

router.get('/', getMainImgs);

router.put('/actualizarImagenes', validarJwt, updateMainImgs);

module.exports = router;

