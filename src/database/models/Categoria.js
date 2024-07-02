module.exports = (sequelize, DataTypes) => {
    const cols = {
        categoria_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        img: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        activo: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }

    const config = {
        tableName: "categorias",
        timestamps: false
    }

    const Categoria = sequelize.define("Categoria", cols, config);

    return Categoria;
}