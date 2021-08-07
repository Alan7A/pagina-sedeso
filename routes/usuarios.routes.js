const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios, getUsuario, createUsuario } = require('../controllers/usuarios.controller')

const router = Router();

router.get('/', getUsuarios);

router.get('/:id', getUsuario);

router.post('/crearUsuario', createUsuario);

module.exports = router