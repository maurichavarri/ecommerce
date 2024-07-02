const { body } = require('express-validator');

module.exports = [

    body('username')
        .notEmpty().withMessage('Debes ingresar un nombre de usuario.'),

    body('contrasenia')
        .notEmpty().withMessage('Debes ingresar una contraseña.'),

    body('clave')
        .notEmpty().withMessage('Debes ingresar la clave de acceso.')
];