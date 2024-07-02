const path = require('path');
const { validationResult } = require('express-validator');
const { Categoria, Producto } = require('../database/models');

module.exports = {

    listado: async (req,res) => {
        try {
            const productos = await Producto.findAll({
                where: {
                    categoria_id: req.params.id, 
                    activo: 1
                }, 
                order: [
                    ['precio', 'ASC'],
                ]
            });
            res.render(path.resolve(__dirname, '../views/product/listado.ejs'), { productos });
        } catch (error) {
            console.log('No se pudo obtener los productos', error);
        }
    },

    administrar: (req,res) => {
        res.render(path.resolve(__dirname, '../views/product/administrar.ejs'));
    },

    addCategoriaView: (req,res) => {
        res.render(path.resolve(__dirname, '../views/product/agregarCategoria.ejs'))
    },

    addCategoria: async (req,res) => {

        const resultado = validationResult(req); /* Guarda en "resultado", un objeto literal con atributo "errors", 
        y este a su vez es un array de objetos literales con cada uno de los errores correspondientes a un campo. */

        if(resultado.errors.length === 0){
            try {
                await Categoria.create({
                    nombre: req.body.nombreCategoria,
                    img: req.file.filename,
                    activo: 1
                });
                res.redirect('/producto/administrar');
            } catch (error) {
                console.error('No se pudo registrar la categoría', error);
            }
        } else {
            res.render(path.resolve(__dirname, '../views/product/agregarCategoria.ejs'), { errors: resultado.mapped() });
        }
    },

    editCategoriaView: async (req,res) => {
        if(req.params.id){
            const categ = await Categoria.findByPk(req.params.id);
            res.render(path.resolve(__dirname, '../views/product/editarCategoriaDetalle.ejs'), { categ });
        }else{
            try {
                const categorias = await Categoria.findAll({ 
                    where: { activo:1 },
                    order: [['nombre', 'ASC'],]
                });
                const categoriasBorradas = await Categoria.findAll({
                    where: { activo:2 },
                    order: [['nombre', 'ASC'],]
                });
                res.render(path.resolve(__dirname, '../views/product/editarCategoria.ejs'), { categorias, categoriasBorradas })
            } catch (error){
                console.log('No se pudo recuperar datos de la db', error);
            }
        }
    },

    editCategoria: async (req,res) => {

        const resultado = validationResult(req);

        if(resultado.errors.length === 0 || (resultado.errors.length === 1 && resultado.mapped().imagen)){ /* Es true cuando están todos los campos completos 
        y no hay ningun error. O puede pasar de que se encuentre un error, y ese sea la falta de una imagen. En ese caso, se carga la imagen que ya estaba
        subida anteriormente.
        */
            try {
                await Categoria.update(
                    {
                        nombre: req.body.nombreCategoria,
                        img: req.file && req.file.filename
                    }, 
                    { where: {categoria_id: req.params.id}}           
                )
                res.redirect('/producto/administrar/editar-categoria');
            } catch(error) {
                console.log("No se pudo actualizar la categoria", error);
            }
        } else {
            const categ = await Categoria.findByPk(req.params.id);
            res.render(path.resolve(__dirname, '../views/product/editarCategoriaDetalle.ejs'), {errors: resultado.mapped(), categ});
        }
    },

    archivarCategoria: async (req,res) => {
        try {
            await Categoria.update({
                activo: 2
                }, {where: {categoria_id: req.params.id}});
            await Producto.update({
                activo: 2
                }, {where: {categoria_id: req.params.id}});
            res.redirect('/producto/administrar/editar-categoria');
        } catch (error) {
            console.log("No se pudo archivar la categoria", error);
        }
    },

    restoreCategoria: async (req,res) => {
        try {
            await Categoria.update({
                activo: 1
                }, {where: {categoria_id: req.params.id}});
            await Producto.update({
                activo: 1
                }, {where: {categoria_id: req.params.id}});
            res.redirect('/producto/administrar/editar-categoria');
        } catch (error) {
            console.log("No se pudo restaurar la categoria", error);
        }
    },

    deleteCategoria: async (req,res) => {
        try {
            await Categoria.update({
                activo: 0
                }, {where: {categoria_id: req.params.id}});
            await Producto.update({
                activo: 0
                }, {where: {categoria_id: req.params.id}});
            res.redirect('/producto/administrar/editar-categoria');
        } catch (error) {
            console.log("No se pudo eliminar la categoria", error);
        }
    },

    /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

    addProductoView: async (req,res) => {
        const categorias = await Categoria.findAll({where: {activo:1}});
        res.render(path.resolve(__dirname, '../views/product/agregarProducto.ejs'), {categorias});
    },

    addProducto: async (req,res) => {

        const resultado = validationResult(req); /* Guarda en "resultado", un objeto literal con atributo "errors", y este 
        a su vez es un array de objetos literales con cada uno de los errores correspondientes a un campo */
        
        if (resultado.errors.length === 0){
            try {
                await Producto.create({
                    nombre: req.body.nombreProducto,
                    descripcion: req.body.descripcion,
                    precio: req.body.precio,
                    img: req.file.filename,
                    categoria_id: req.body.categoria,
                    activo: 1
                });
                res.redirect('/producto/administrar');
            } catch (error) {
                console.log("No se pudo registrar el producto", error);
            }
        } else {
            const categorias = await Categoria.findAll({where: {activo:1}});
            res.render(path.resolve(__dirname, '../views/product/agregarProducto.ejs'), {errors: resultado.mapped(), categorias});
        }
    },

    editProductoView: async (req,res) => {
        if(req.params.id){
            const categorias = await Categoria.findAll({where: {activo:1}});
            const producto = await Producto.findByPk(req.params.id);
            res.render(path.resolve(__dirname, '../views/product/editarProductoDetalle.ejs'), { producto, categorias });
        }else{
            try {
                const categorias = await Categoria.findAll({where: {activo:1}});
                const productos = await Producto.findAll({
                    where: {activo:1}, 
                    order: [['nombre', 'ASC'],]
                });
                const productosBorrados = await Producto.findAll({
                    where: {activo:2}, 
                    order: [['nombre', 'ASC'],]
                });
                res.render(path.resolve(__dirname, '../views/product/editarProducto.ejs'), { categorias, productos, productosBorrados });
            } catch (error){
                console.log("No se pudo recuperar datos de la db", error);
            }
        }
    },

    editProducto: async (req,res) => {

        const resultado = validationResult(req);

        if (resultado.errors.length === 0 || (resultado.errors.length === 1 && resultado.mapped().imagen)){ /* Es true cuando están todos los campos completos 
        y no hay ningun error. O puede pasar de que se encuentre un error, y ese sea la falta de una imagen. En ese caso, se carga la imagen que ya estaba
        subida anteriormente.
        */
            try {
                await Producto.update({
                    nombre: req.body.nombreProducto,
                    descripcion: req.body.descripcion,
                    precio: req.body.precio,
                    categoria_id: req.body.categoria,
                    img: req.file && req.file.filename
                },
                {where: {producto_id: req.params.id}})
                res.redirect('/producto/administrar/editar-producto');
            } catch(error) {
                console.log("No se pudo editar el producto", error);
            }
        } else {
            const categorias = await Categoria.findAll({where: {activo:1}});
            const producto = await Producto.findByPk(req.params.id);
            res.render(path.resolve(__dirname, '../views/product/editarProductoDetalle.ejs'), { errors: resultado.mapped(), producto, categorias });
        }
    },

    archivarProducto: async (req,res) => {
        try {
            await Producto.update({activo: 2}, {
                where: {producto_id: req.params.id}
            });
            res.redirect('/producto/administrar/editar-producto');
        } catch(error) {
            console.log('No se pudo archivar el producto', error);
        }
    },

    restoreProducto: async (req,res) => {
        try {
            await Producto.update({activo: 1}, {
                where: {producto_id: req.params.id}
            });
            res.redirect('/producto/administrar/editar-producto');
        } catch(error) {
            console.log('No se pudo restaurar el producto', error);
        }
    },

    deleteProducto: async (req,res) => {
        try {
            await Producto.update({activo: 0}, {
                where: {producto_id: req.params.id}
            });
            res.redirect('/producto/administrar/editar-producto');
        } catch(error) {
            console.log('No se pudo eliminar el producto', error);
        }
    },

    carritoView: (req,res) => {
        res.render(path.resolve(__dirname, '../views/product/carrito.ejs'));
    }
}