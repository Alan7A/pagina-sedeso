const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const validarCampos = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
    check('email', 'El email es inválido.').isEmail(),
    check('contra', 'La contraseña no puede estar vacía').notEmpty(),
    validarCampos
], login);

module.exports = router