# PROYECTO E-COMMERCE

## Descripción de su propósito, diseño y funcionalidades.

Bienvenidos a mi proyecto. Este es un E-Commerce genérico, con temática de "comida rápida". 

Con respecto al diseño, es bastante simple, la elección del tema y paleta de colores fue acorde al rubro. También cuenta con __responsive design__, facilitando su uso desde cualquier dispositivo (celular, tablet u ordenador).

Sobre sus funcionalidades, podemos dividirlas en 2 partes: 

- La primera, es mostrar (al cliente) la lista de categorías y productos disponibles, más la opción de "agregar al carrito", para poder concretar una compra si así lo deseamos.

- La segunda, es permitir añadir, actualizar y borrar (CRUD) categorías/productos. Solo los usuarios administradores tendrán acceso a esta sección.

## Detalles Tecnicos

Para el back-end usamos: Node.js y MySql.

Para el front-end usamos: JavaScript, CSS y HTML (acompañado del motor de plantillas EJS).

## Guia de instalación

Listado de cosas que necesitaremos para la ejecución del programa:

- Visual Studio Code
- Node.js
- Git Bash
- XAMPP
- MySql Workbench

Una vez que hayamos clonado el repositorio, iremos a la terminal e instalaremos las dependencias a través del comando __npm install__. Antes de ejecutar el programa, tenemos que iniciar __XAMPP__, y darle "Start" a __MySql__. Luego, en __MySql Workbench__, ejecutaremos el script que se encuentra en la carpeta SCRIPT-DB, para que de esta forma, se cree nuestra base de datos. Por ultimo, levantaremos el servidor a través del comando __npm test__.

## Guia de como registrarse dentro del programa

Al momento de crear nuestro usuario, nos pedirá una "clave de acceso", el valor de esta es: __244456__ (Esta misma puede ser modificada desde el controlador). Esta clave de acceso solo la sabría el propietario del negocio, y fue añadida para que no cualquier persona pueda registrarse y tener acceso a las funciones de administrador.

## Video Demostrativo (Enlace)

https://drive.google.com/file/d/1spKinad8baNBrjndXSwYHzceXK0eh3vD/view?usp=sharing
