const { body } = require('express-validator');

module.exports = [

    body('nombreProducto')
        .notEmpty().withMessage('Debes ingresar un nombre.'),

    body('descripcion')
        .notEmpty().withMessage('Debes ingresar una descripción.'),

    body('precio')
        .notEmpty().withMessage('Debes ingresar un precio.')
        .isNumeric(),
        
    body('categoria')
        .notEmpty().withMessage('Debes seleccionar una categoría.'),

    body('imagen')
        .custom(( value , { req }) => {
            return !req.file ? false : true;
        })
        .withMessage('Debes subir una imagen.')
];