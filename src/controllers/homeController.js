const path = require('path');
const { Categoria } = require('../database/models');

module.exports = {
    index: async (req,res) => {
        try {
            const categorias = await Categoria.findAll({
                where: {
                    activo: 1
                }
            });
            res.render(path.resolve(__dirname, '../views/web/home.ejs'), { categorias })
        } catch (error) {
            console.error('No se pudo recuperar datos de la db', error);
        }
    }
}