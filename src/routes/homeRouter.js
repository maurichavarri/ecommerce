const express = require('express');
const router = express.Router();
const path = require('path');

//----- Requerimos el controlador. -----//
const homeController = require(path.resolve(__dirname, '../controllers/homeController.js'));

//----------------------------------------------------------------------------------------//

router.get('/', homeController.index);

module.exports = router;