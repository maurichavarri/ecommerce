//----- Requerimos las librerías. -----//
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const methodOverride = require('method-override');
const session = require('express-session');


//----- Estos middlewares deben estar antes de usar las rutas, sino no funcionan, no se por qué. -----//
app.use(express.urlencoded({ extended: false })); //Sirve para tomar la información que ingresa desde los formularios
app.use(session({                                 
    secret: 'shhh...',
    resave: false,
    saveUninitialized: false
}));
app.use(methodOverride('_method')); //Sirve para poder hacer uso de los metodos PUT y DELETE


//----- Requerimos las rutas. -----//
const homeRouter = require('./routes/homeRouter.js');
const usuarioRouter = require('./routes/usuarioRouter.js');
const productoRouter = require('./routes/productoRouter.js');


//----- Usamos las rutas. -----//
app.use('/', homeRouter);
app.use('/usuario', usuarioRouter);
app.use('/producto', productoRouter);


//----- Seteamos motor de plantillas y donde encontrar las views. -----//
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './views'));


//----- Middlewares de aplicación. -----//
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.json);


//----- Levantamos el servidor. -----//
app.listen(port, ()=> {
    console.log(`Servidor corriendo en https://localhost:${port}.`);
});