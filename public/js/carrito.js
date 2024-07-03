window.addEventListener('load', () => {

    // Al momento de cargar la página, consultamos la cantidad de productos agregados al carrito.
    // Según el número que obtengamos, cambiamos el valor y estilo del "contador de carrito."
    document.getElementById('contador-carrito').innerHTML = `${localStorage.length}`;

    if (localStorage.length > 0){
        document.getElementById('contador-carrito').style.backgroundColor = 'rgb(255, 115, 0)';
    } else {
        document.getElementById('contador-carrito').style.backgroundColor = 'grey';
    }

    //--------------------          FUNCIONES          ------------------------------------------------------------------------------------------------------------------------//

    // Estilamos el botón de "Añadir al carrito", como si aún no hubiese sido presionado, 
    // y cambiamos su contenido según el tamaño de pantalla.
    function btnComprarStyle(comprar){
        comprar.style.width = '50%';
        comprar.style.borderRadius = '5px';
        comprar.style.backgroundColor = "rgb(255, 115, 0)"
        comprar.innerHTML = 'Añadir';
    }

    // Cambiamos el contenido y estilo del boton "agregar al carrito", cuando este es clickeado
    function btnComprarClickStyle(comprar){
        comprar.style.width = "25px";
        comprar.style.height = "25px";
        comprar.style.borderRadius = "50%"
        comprar.style.backgroundColor = "grey";
        comprar.innerHTML = "✔";
    }

    // Funcion que muestra u oculta el div que contiene el total del carrito, según el localStorage.length.
    // Si es igual a 0, quiere decir que NO hay productos en el carrito, y por lo tanto lo oculta. Si sucede
    // lo contrario, quiere decir que si hay productos en el carrito, y por lo tanto lo muestra.
    function ocultarMostrarTotalCarrito(){
        if (localStorage.length == 0){
            document.getElementById('caja-aviso').style.display = 'block';
            document.getElementById('titulo-carrito').style.display = 'none';
            document.getElementById('caja-resultados-carrito').style.display = 'none';
            document.getElementById('caja-comprar-wpp').style.display = 'none';
        } else {
            document.getElementById('caja-aviso').style.display = 'none';
            document.getElementById('titulo-carrito').style.display = 'block';
            document.getElementById('caja-resultados-carrito').style.display = 'flex';
            document.getElementById('caja-comprar-wpp').style.display = 'flex';
        }
    }

    // Función para calcular y mostrar el precio total del carrito
    function calcularPrecioTotal() {

        // Inicializamos el precio total en 0
        let precioTotal = 0;

        // Iteramos a través de los productos en el carrito
        for (let key in localStorage) {

            if (localStorage.hasOwnProperty(key)) {

                // Obtenemos el producto del localStorage
                let productoJSON = localStorage.getItem(key);
                let producto = JSON.parse(productoJSON);

                // Calculamos el subtotal del producto (precio * cantidad)
                let subtotalProducto = producto.precio * producto.cantidad;

                // Sumamos el subtotal del producto al precio total
                precioTotal += subtotalProducto;
            }
        }

        // Mostramos el precio total en la interfaz de usuario
        document.getElementById('caja-total-num').innerHTML = `$${precioTotal}`;
    }





    //--------------------          AGREGAR UN PRODUCTO AL CARRITO O QUITARLO             --------------------------------------------------------------------------------------//

    // Guardamos en la variable "productos", un array con cada uno de los <article>, correspondientes a cada producto
    let productos = document.querySelectorAll('.caja-hija');

    // Recorremos dicho array...
    productos.forEach(producto => {

        // Guardamos en "idProducto", el id de dicho producto. Este se encuentra oculto en una etiqueta <p>
        let idProducto = producto.querySelector('.id').textContent;
        // Guardamos en "comprar", el botón de "Agregar al Carrito"
        let comprar = producto.querySelector('.comprar');

        //Preguntamos si en localStorage, existe un objeto con clave igual al id del producto...
        if (localStorage.getItem(idProducto) == null){
            // Si NO existe, quiere decir que aún ese producto no fue añadido al carrito, y por lo tanto
            // le agregamos los estilos correspondientes al boton de "Añadir al Carrito"
            btnComprarStyle(comprar);
        } else {
            // En el caso de que SI exista, quiere decir que ese producto ya fue añadido al carrito, y por lo tanto
            // le agregamos los estilos correspondientes al boton de "Añadir al carrito"
            btnComprarClickStyle(comprar);
        }

        // Hacemos click en el boton de "Añadir al carrito"...
        comprar.addEventListener('click', (e) => {

            // ...y preguntamos si el producto ya fue agregado. Si ese es el caso, se cumple la condición
            // y se lo agrega.
            if (comprar.textContent == "Añadir"){
                
                btnComprarClickStyle(comprar);

                document.getElementById('contador-carrito').style.backgroundColor = 'rgb(255, 115, 0)';

                let nombreProducto = producto.querySelector('.caja-nombre h3').textContent;
                let precioProductoString = producto.querySelector('.caja-precio .precio').textContent;
                let precioProducto = parseInt(precioProductoString.replace("$", ""));

                let nuevoProducto = {};
                nuevoProducto.id = idProducto;
                nuevoProducto.nombre = nombreProducto;
                nuevoProducto.precio = precioProducto;
                nuevoProducto.cantidad = 1;
                
                // Guardamos en localStorage el producto que agregamos al carrito. Este es un objeto
                // que tiene por clave el 'id' del producto, y como atributos tiene el nombre, el precio y la cantidad,
                // (que en este caso, por defecto es siempre 1).        
                localStorage.setItem(`${idProducto}`, JSON.stringify(nuevoProducto));

                document.getElementById('contador-carrito').innerHTML = `${localStorage.length}`;

                // Recuperar desde localStorage
                //let nuevoProductoGuardado = JSON.parse(localStorage.getItem(`${idProducto}`));

            // Si el producto ya fue añadido anteriormente, al hacer click en el boton
            // se procede a remover el producto del carrito.
            } else {
                
                localStorage.removeItem(idProducto);
                document.getElementById('contador-carrito').innerHTML = `${localStorage.length}`;
                btnComprarStyle(comprar);
                
                if (localStorage.length == 0){
                    document.getElementById('contador-carrito').style.backgroundColor = 'grey';
                }

            }
        })
    })



    

    // Preguntamos si hay productos en el carrito. Si localStorage.length es mayor a 0, quiere decir que hay 1 o más
    // productos agregados.
    if (localStorage.length > 0){

        //--------------------          EDITAR VISTA DE CARRITO          -------------------------------------------------------------------------------------------------------//

        ocultarMostrarTotalCarrito();

        // Hacemos un recorrido por cada uno de los objetos del localStorage...
        for (let key in localStorage) {

            if (localStorage.hasOwnProperty(key)) {

                // Obtenemos un producto, hacemos la conversion y asignamos a la variable
                let productoJSON = localStorage.getItem(key);
                let producto = JSON.parse(productoJSON);

                // Creamos una etiqueta <article>, y lo guardamos en la variable "article".
                // Esta etiqueta, envolverá a otros divs, que a su vez contendrán información de un producto
                let article = document.createElement('article');

                //-----------------------------------------------------------------------------------------
                // En esta porción de código lo que hacemos es:
                // Creamos varios divs y les asignamos una clase según la información que vayan a contener.
                // Les añadimos dicha información a través del .innerHTML, y luego
                // los envolvemos dentro de la etiqueta <article>.
                let cajaID = document.createElement('div');
                cajaID.classList.add('caja-id');
                cajaID.classList.add('displayNone');
                cajaID.innerHTML = producto.id;
                article.appendChild(cajaID);

                let cajaNombre = document.createElement('div');
                cajaNombre.classList.add('caja-nombre');
                cajaNombre.innerHTML = producto.nombre;
                article.appendChild(cajaNombre);

                let cajaPrecio = document.createElement('div');
                cajaPrecio.classList.add('caja-precio');
                cajaPrecio.innerHTML = producto.precio;
                article.appendChild(cajaPrecio);

                let cajaCantidad = document.createElement('div');
                cajaCantidad.classList.add('caja-cantidad');
                cajaCantidad.innerHTML = producto.cantidad;
                article.appendChild(cajaCantidad);

                let cajaBotonesCantidad = document.createElement('div');
                cajaBotonesCantidad.classList.add('caja-botones-cantidad');
                let boton1 = document.createElement('button');
                boton1.classList.add('boton1');
                boton1.innerHTML = "+"
                let boton2 = document.createElement('button');
                boton2.classList.add('boton2');
                boton2.innerHTML = "-"
                cajaBotonesCantidad.appendChild(boton1);
                cajaBotonesCantidad.appendChild(boton2);
                article.appendChild(cajaBotonesCantidad);
                //----------------------------------------------------------------------------------------

                // Finalmente, envolvemos el <article>, ya con toda la información del producto, dentro de 
                // la etiqueta padre <section>.
                document.getElementById('caja-productos-carrito').appendChild(article);

                // Se repite todo el proceso, en el caso de que haya mas de 1 producto agregado al carrito.
            }
        }

        calcularPrecioTotal();





        //--------------------          CAMBIAR CANTIDAD DE PRODUCTOS EN CARRITO          --------------------------------------------------------------------------------------//

        // Obtenemos un array de las etiquetas <article>, de la vista 'carrito.ejs', en la variable 'productosEnCarrito'.
        // Estas etiquetas envuelven la información de cada uno de los productos que fueron agregados al carrito.
        let productosEnCarrito = document.querySelectorAll('article');
        
        // Recorremos dicho array...
        productosEnCarrito.forEach(producto => {
            
            // ... y por cada <article> (producto), obtenemos el botón de + y -, que sirven para aumentar o disminuir la cantidad
            // de cada producto, según como lo deseemos.
            let botonMas = producto.querySelector('.boton1');
            let botonMenos = producto.querySelector('.boton2');

            // Si hacemos click en "+"...
            botonMas.addEventListener('click', ()=>{

                // Obtenemos el id del producto, que se encuentra oculto en un <div>.
                let id = producto.querySelector('.caja-id').textContent;

                // A partir del id que obtuvimos, localizamos dicho producto en el localStorage, lo obtenemos en formato JSON, y lo
                // asignamos a la variable.
                productoEnLocalStorageJSON = localStorage.getItem(id);

                // Hacemos la conversión a objeto literal, y lo asignamos a la variable.
                productoEnLocalStorage = JSON.parse(productoEnLocalStorageJSON);

                // Actualizamos el objeto literal, en su atributo 'cantidad'. Le sumamos 1 al valor anterior.
                productoEnLocalStorage.cantidad += 1;

                // Hacemos la conversión del objeto (ya actualizado) a JSON, y lo asignamos a la variable.
                productoActualizadoJSON = JSON.stringify(productoEnLocalStorage);

                // Actualizamos la información del localStorage, en el mismo lugar de donde obtuvimos la información del producto.
                localStorage.setItem(id, productoActualizadoJSON);

                // Actualizamos la información del <div> (que contiene la cantidad del producto).
                producto.querySelector('.caja-cantidad').innerHTML = `${productoEnLocalStorage.cantidad}`;

                calcularPrecioTotal();

            });

            // Si hacemos click en "-"...
            botonMenos.addEventListener('click', ()=>{

                // Obtenemos el id del producto, que se encuentra oculto en un <div>.
                let id = producto.querySelector('.caja-id').textContent;

                // A partir del id que obtuvimos, localizamos dicho producto en el localStorage, lo obtenemos en formato JSON, y lo
                // asignamos a la variable.
                productoEnLocalStorageJSON = localStorage.getItem(id);

                // Hacemos la conversión a objeto literal, y lo asignamos a la variable.
                productoEnLocalStorage = JSON.parse(productoEnLocalStorageJSON);

                // Si al momento de hacer click en el botón "-", el valor de "cantidad" es igual a 1, este producto debe ser eliminado del carrito,
                // ya que posterior a esta acción, el valor de "cantidad", tomará el valor 0.
                if (productoEnLocalStorage.cantidad == 1){

                    // Procedemos a eliminar el producto de localStorage, a partir del id que obtuvimos de la etiqueta anteriormente.
                    localStorage.removeItem(`${id}`);

                    // Eliminamos el <article>, que envuelve toda la información del producto.
                    producto.remove();

                    // Actualizamos el contador del carrito, que se encuentra en el <header>
                    document.getElementById('contador-carrito').innerHTML = `${localStorage.length}`;

                    if (localStorage.length == 0){
                        document.getElementById('contador-carrito').style.backgroundColor = 'grey';
                    }

                // Si al momento de hacer click en el botón "-", el valor de "cantidad" es igual a 2 o más...    
                } else {

                    // Actualizamos el objeto literal, en su atributo 'cantidad'. Le restamos 1 al valor anterior.
                    productoEnLocalStorage.cantidad -= 1;

                    // Hacemos la conversión del objeto (ya actualizado) a JSON, y lo asignamos a la variable.
                    productoActualizadoJSON = JSON.stringify(productoEnLocalStorage);

                    // Actualizamos la información del localStorage, en el mismo lugar de donde obtuvimos la información del producto.
                    localStorage.setItem(id, productoActualizadoJSON);

                    // Actualizamos la información del <div> (que contiene la cantidad del producto).
                    producto.querySelector('.caja-cantidad').innerHTML = `${productoEnLocalStorage.cantidad}`;
                }

                // Comprobamos el localStorage.length, posterior a estas acciones, y tomamos medidas acorde a los resultados
                // (ocultar o mostrar el total del carrito).
                ocultarMostrarTotalCarrito();

                calcularPrecioTotal();
            })
        })





        //--------------------          MENSAJE DE WHATSAPP          -----------------------------------------------------------------------------------------------------------//

        // Al momento de hacer click en el botón "Enviar a WhatsApp"...
        document.getElementById('caja-comprar-wpp').addEventListener('click', () => {
            
            // Creamos una variable, y vamos asignandole el texto que armaremos.
            let msj = "¡Hola! Estos son los productos que quiero encargar:\n"

            // Recorremos el localStorage, con todos los productos agregados al carrito...
            for (let key in localStorage) {

                if (localStorage.hasOwnProperty(key)) {
    
                    // Obtenemos un producto, hacemos la conversion y asignamos a la variable
                    let productoJSON = localStorage.getItem(key);
                    let producto = JSON.parse(productoJSON);

                    // A la variable que creamos anteriormente, le vamos concatenando texto, con los valores
                    // de cada uno de los productos
                    msj += "- " + producto.nombre + " (x" + producto.cantidad + ")\n";
                }
            }

            // Al final del recorrido del localStorage, concatenamos el total a pagar y demás texto.
            msj += "El total a pagar es de " + document.getElementById('caja-total-num').textContent + ".\n\n";
            msj += "A continuación escriba su nombre, método de pago y envío:";
            
            // Codificamos el mensaje...
            let msjCodificado = encodeURIComponent(msj);

            // Guardamos en una variable el nro del negocio.
            let nroTelefono = 3854748843;

            // Y finalmente, abrimos una nueva ventana, al WhatsApp del negocio, con el mensaje del pedido.
            window.open("https://api.whatsapp.com/send?phone=" + nroTelefono + "&text=" + msjCodificado);
        })
    }
})





//-----------------------------------------------------------------------------------------------
// Esta porción de codigo, la usamos para corregir un bug en el contador de carrito. Por ejemplo:
// Si agregabamos 2 productos al carrito, y luego los eliminabamos, si volviamos atrás en la 
// pàgina, el contador tomaba valores anteriores, y no los actualizados. Con esto se soluciona.

window.addEventListener('storage', () => {
    
    // Al momento de cargar la página, consultamos la cantidad de productos agregados al carrito.
    // Según el número que obtengamos, cambiamos el valor y estilo del "contador de carrito."
    document.getElementById('contador-carrito').innerHTML = `${localStorage.length}`;

    if (localStorage.length > 0){
        document.getElementById('contador-carrito').style.backgroundColor = 'rgb(255, 115, 0)';
    } else {
        document.getElementById('contador-carrito').style.backgroundColor = 'grey';
    }
});
//-----------------------------------------------------------------------------------------------
