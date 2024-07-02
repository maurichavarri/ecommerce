module.exports = (sequelize, DataTypes) => {
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        contrasenia: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        activo: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }

    const config = {
        tableName: "usuarios",
        timestamps: false
    }

    const Usuario = sequelize.define("Usuario", cols, config);

    return Usuario;
}