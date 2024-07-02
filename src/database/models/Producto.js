module.exports = (sequelize, DataTypes) => {
    const cols = {
        producto_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        precio: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        img: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        categoria_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        activo: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }

    const config = {
        tableName: "productos",
        timestamps: false
    }

    const Producto = sequelize.define("Producto", cols, config);

    Producto.associate = function(modelos){
        Producto.hasOne(modelos.Categoria, {
            as: "categoria",
            foreignKey: "categoria_id"
        })
    }

    return Producto;
}