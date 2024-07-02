const { body } = require('express-validator');

module.exports = [

    body('nombreCategoria')
        .notEmpty().withMessage('Debes ingresar un nombre.'),

    body('imagen')
        .custom(( value , { req }) => {
            return !req.file ? false : true;
        })
        .withMessage('Debes subir una imagen')
];