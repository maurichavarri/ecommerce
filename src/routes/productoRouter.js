const express = require('express');
const router = express.Router();
const path = require('path');

//----- Requerimos los middlewares. -----//
const validacionProducto = require('../middlewares/validaciónProducto.js');
const validacionCategoria = require('../middlewares/validacionCategoria.js');
const validacionSession = require('../middlewares/validacionSession.js');
const uploadFileCategoria = require('../middlewares/multerCategoria.js');
const uploadFileProducto = require('../middlewares/multerProducto.js');

//----- Requerimos el controlador. -----//
const productoController = require(path.resolve(__dirname, '../controllers/productoController.js'));

//------------------------------------------------------------------------------------------------------------------------------------------//

router.get('/administrar', validacionSession.notSession, productoController.administrar);

router.get('/listado/:id', productoController.listado);

router.get('/administrar/agregar-categoria', validacionSession.notSession, productoController.addCategoriaView);
router.post('/administrar/agregar-categoria', uploadFileCategoria.single('imagen'), validacionCategoria, productoController.addCategoria);

router.get('/administrar/editar-categoria/:id?', validacionSession.notSession, productoController.editCategoriaView);
router.put('/administrar/editar-categoria/:id', uploadFileCategoria.single('imagen'), validacionCategoria, productoController.editCategoria);

router.get('/administrar/archivar-categoria/:id', validacionSession.notSession, productoController.archivarCategoria);

router.get('/administrar/restaurar-categoria/:id', validacionSession.notSession, productoController.restoreCategoria);

router.get('/administrar/borrar-categoria/:id', validacionSession.notSession, productoController.deleteCategoria);

//------------------------------------------------------------------------------------------------------------------------------------------//


router.get('/administrar/agregar-producto', validacionSession.notSession, productoController.addProductoView);
router.post('/administrar/agregar-producto', uploadFileProducto.single('imagen'), validacionProducto, productoController.addProducto);

router.get('/administrar/editar-producto/:id?', validacionSession.notSession, productoController.editProductoView);
router.put('/administrar/editar-producto/:id', uploadFileProducto.single('imagen'), validacionProducto, productoController.editProducto);

router.get('/administrar/archivar-producto/:id', validacionSession.notSession, productoController.archivarProducto);

router.get('/administrar/restaurar-producto/:id', validacionSession.notSession, productoController.restoreProducto);

router.get('/administrar/borrar-producto/:id', validacionSession.notSession, productoController.deleteProducto);

//------------------------------------------------------------------------------------------------------------------------------------------//

router.get('/carrito', productoController.carritoView);

//------------------------------------------------------------------------------------------------------------------------------------------//

module.exports = router;