// Verifica si un usuario está logueado. 

// Si es true, algunas rutas no pueden ser ingresadas (como por ej: login, register) 
// y redirecciona automaticamente al home "/". 

// Si es false, algunas rutas no pueden ser ingresadas (como por ej: administrar)
// y redirecciona automaticamente a /usuario/login.

module.exports = {

    session: (req,res,next) => {
        if(req.session.userLogged){
            return res.redirect('/');
        }else{
            next();
        }
    },

    notSession: (req,res,next) => {
        if(!req.session.userLogged){
            return res.redirect('/usuario/login');
        }else{
            next();
        }
    }
}