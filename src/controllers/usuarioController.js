const path = require('path');
const { validationResult } = require('express-validator');
const { Usuario } = require('../database/models');

module.exports = {

    loginView: (req,res) => {
        res.render(path.resolve(__dirname, '../views/user/login.ejs'));
    },
    
    login: async (req,res) => {
        try {
            let usuarioALoguear = await Usuario.findOne({ //Se busca un usuario que coincida con el "username" ingresado
                where: {
                    username: req.body.username
                }
            });

            if (usuarioALoguear) { //Si existe el usuario...

                if (usuarioALoguear.contrasenia == req.body.contrasenia) { //Se procede a verificar si las contraseñas coinciden
                    req.session.userLogged = usuarioALoguear; //Y creamos el objeto literal "userLogged", a partir de la info ingresada
                    return res.redirect('/producto/administrar');
                }
            }
            
            //En el caso de que el "username" o la "contrasenia" no coincidan, se renderiza la vista nuevamente y se envia un mensaje
            return res.render(path.resolve(__dirname, '../views/user/login.ejs'), {errors: {msg: "Usuario y/o contraseña inválidos."}});

        } catch(error) {
            console.log("Ups, Error...", error);
        }
    },

    registerView: (req,res) => {
        res.render(path.resolve(__dirname, '../views/user/register.ejs'));
    },

    register: async (req,res) => {

        const resultado = validationResult(req);
        if (resultado.errors.length === 0 && req.body.clave == 244456){ //Si el formulario NO está vacío y se ingresa correctamente la clave de acceso...
            try {
                const usuario = await Usuario.findOne({where: {username: req.body.username}}); /* En caso de querer crear una cuenta con un nombre de usuario ya existente,
                lo asigna a la constante "usuario". */
    
                if(!usuario){ //Si dicho usuario no existe, se procede a crear la cuenta
                    await Usuario.create({
                        username: req.body.username,
                        contrasenia: req.body.contrasenia,
                        activo: 1
                    })
                    res.redirect('/usuario/login');
                } else { //Caso contrario, se vuelve a renderizar la vista con un mensaje de error
                    res.render(path.resolve(__dirname, '../views/user/register'), { errors: {msg: 'El usuario ya existe.'} });
                }
            } catch (error) {
                console.log("No se pudo crear el usuario", error);
            }
        }else{ //Si el formulario ESTÁ vacío... 
            res.render(path.resolve(__dirname, '../views/user/register'), { errors: {msg: "Los campos están vacíos o son inválidos."} });
        }
    }
}