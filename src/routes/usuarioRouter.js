const express = require('express');
const router = express.Router();
const path = require('path');

//----- Requerimos los middleware. -----//
const validacionSession = require('../middlewares/validacionSession.js');
const validacionRegister = require('../middlewares/validacionRegister.js');

//----- Requerimos el controlador. -----//
const usuarioController = require(path.resolve(__dirname, '../controllers/usuarioController.js')); 

//----------------------------------------------------------------------------------------------//

router.get('/login', validacionSession.session, usuarioController.loginView);
router.post('/login', usuarioController.login);

router.get('/register', validacionSession.session, usuarioController.registerView);
router.post('/register', validacionRegister, usuarioController.register);

module.exports = router;