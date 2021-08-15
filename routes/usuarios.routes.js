const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, getUser, createUser, modifyUser, deleteUser } = require('../controllers/usuarios.controller');
const validarCampos = require('../middlewares/validar-campos');

const router = Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/crearUsuario',
    [
        check('coordinador', 'El nombre no puede estar vacío').notEmpty(),
        check('email', 'Email inválido').isEmail(),
        check('contra', 'La contraseña no puede estar vacía').notEmpty(),
        validarCampos
    ],
    createUser);

router.put('/modificarUsuario/:id',
    [
        check('coordinador', 'El nombre no puede estar vacío').notEmpty(),
        check('email', 'Email inválido').isEmail(),
        check('contra', 'La contraseña no puede estar vacía').notEmpty(),
        validarCampos
    ],
    modifyUser);

router.delete('/eliminarUsuario/:id', deleteUser);

module.exports = router;