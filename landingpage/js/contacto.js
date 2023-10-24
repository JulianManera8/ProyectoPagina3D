
//ACA EMPIEZA LA PARTE DE FUNCIONALIDAD DEL FORM

document.addEventListener('DOMContentLoaded', () => {

    //VARIABLES
    const formulario = document.querySelector('#formulario')
    const inputNombreApellido = document.querySelector('#nombreApellido');
    const labelNombreApellido = document.querySelector('.labelNombreApelido');
    const inputEmail = document.querySelector('#email');
    const labelEmail = document.querySelector('.labelEmail');
    const inputAsunto = document.querySelector('#asunto');
    const labelAsunto = document.querySelector('.labelAsunto');
    const inputMensaje = document.querySelector('#mensaje');
    const labelMensaje = document.querySelector('.labelMensaje');
    const botonEnviar = document.querySelector('#botonEnviar');
    const botonReset = document.querySelector('#botonReset');
    const spinners = document.querySelector('#spinner');
    const pSpinner = document.querySelector('#p-spinner');
    

    const correo = {
        
        email: '',
        asunto: '',
        mensaje: '',
    }

    //EVENTOSLISTENEROS
    inputNombreApellido.addEventListener('input', validar);
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    botonEnviar.addEventListener('click', enviarMail);
    botonReset.addEventListener('click', resetForm);

    //FUNCIONES
    function validar(e) {

        if (e.target.value.trim() === '') {
            mostrarError(`Tienes que completar el ${e.target.name}`, e.target.parentElement);
            correo[e.target.name] = '';
            validarObjCorreo(correo);
            moverLabel(e.target.parentElement);
            return
        } 

        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarError(`Tienes que escribir bien el email`, e.target.parentElement);
            correo[e.target.name] = '';
            validarObjCorreo(correo);
            return;
        }

        limpiarAlertas(e.target.parentElement);
        restablecerLabel(e.target.parentElement);

        correo[e.target.name] = e.target.value.trim().toLowerCase();
        validarObjCorreo(correo);
        console.log(correo)
    }


    function mostrarError(mensaje, referencia) {
        limpiarAlertas(referencia);

        const error = document.createElement('p');
        error.textContent = mensaje;
        error.classList.add('alertaError');
        error.setAttribute('id', 'alertas');
        referencia.appendChild(error);

    }

    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const emailValidado = regex.test(email)
        return emailValidado;
    }


    function validarObjCorreo(correo) {
        if (! Object.values(correo).includes('')) {
            botonEnviar.style.opacity = 1;
            botonEnviar.disabled = false;
        } else {
            botonEnviar.style.opacity = 0.3;
            botonEnviar.disabled = true;
        }
    }

    function resetForm(e) {
        e.preventDefault();

        correo.email = '';
        correo.asunto = '';
        correo.mensaje = '';
        
        formulario.reset(); 
        validarObjCorreo(correo);

        const alertas = document.querySelectorAll('.alertaError');
        alertas.forEach( function(alert) {
            alert.remove();
        })

        labelRestar();
    }


    function enviarMail(e){
        e.preventDefault();
        botonEnviar.style.opacity = 0;
        botonReset.style.opacity = 0;
        spinners.classList.remove('hidden');
        

        setTimeout(function(){
            spinners.classList.add('hidden');
            const alertaBien = document.createElement('div');
            alertaBien.textContent = `El correo se envió correctamente`;
            alertaBien.classList.add('alertaBien');
            formulario.appendChild(alertaBien);

            setTimeout(function(){
                formulario.removeChild(alertaBien);
                botonEnviar.style.opacity = 100;
                botonEnviar.disabled = true;
                botonReset.style.opacity = 100;
                labelRestar();
                formulario.reset();
            }, 2000);
        }, 2000)
    }



    function limpiarAlertas(referencia) {
        const alertaDoble = referencia.querySelector('.alertaError')

        if (alertaDoble) {
            alertaDoble.remove();
        };
    }

    function moverLabel(ubicacion) {
        const colorInput = ubicacion.querySelector('.input');
        const labelCambiar  = ubicacion.querySelector('.user-label');
        colorInput.style.border = "2px solid red";
        labelCambiar.style.color = 'red';
        return
    }

    function restablecerLabel(ubicacion) {
        const colorInput = ubicacion.querySelector('.input');
        const labelCambiar  = ubicacion.querySelector('.user-label');
        colorInput.style.border = "3px solid green";
        labelCambiar.style.color = 'green';
        return
    }

    function labelRestar() {
        inputNombreApellido.style.border = "2px solid black";
        inputAsunto.style.border = "2px solid black"
        inputEmail.style.border = "2px solid black"
        inputMensaje.style.border = "2px solid black"

        labelNombreApellido.style.color = "black";
        labelAsunto.style.color = "black"
        labelEmail.style.color = "black"
        labelMensaje.style.color = "black"


    }

})

//VARIABLES
const carrito = document.querySelector('#carrito');
const listaProductos = document.querySelector('#lista-productos');
const listaProductos2 = document.querySelector('.lista-productos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const botonesCarrito = document.querySelector('.botones-carrito');
const botonVaciarCarrito = document.querySelector('.vaciar-carrito');
const botonPagarCarrito = document.querySelector('.pagar-carrito');
const divNadaCarrito = document.querySelector('.nadaCarrito');
const divSubtotal = document.querySelector('.subtotal');
const spanSubtotal = document.querySelector('.precio-subtotal');
const iconoCarrito = document.querySelector('#img-carrito');
const imgCarrito = document.getElementById('img-carrito');
const contadorCarrito = document.getElementById('contadorCarrito');
const imgCerrarCarrito = document.getElementById('img-close');
const submenuCarrito = document.querySelector('.submenu');
const spanTotal = document.querySelector('#totalCarrito');
const ofertasEspeciales = document.getElementById('listadoOfertas') 
const btnOfertas = document.getElementById('btn-ofertas')
const btnOfertas2 = document.getElementById('btn-ofertas2')
const irAlBlog = document.querySelector('.a-pMostrarEnvio');
const blogEnvio = document.querySelector('.infoEnvio');
const irModelosFooter = document.querySelector('.irModelosFooter')
const modelosFooter = document.querySelector('.modelosFooter');


let totalCarrito = 0;

const pMostrarEnvio = document.querySelector('.p-mostrarEnvio')

let arregloProductos = [];
const objProducto = {
    img: '',
    nombre: '',
    precio: '',
    cantidad: ''
}

//EVENTOS

crearEventos();
function crearEventos() {
    
    //agregar producto seleccionado al carrito
    listaProductos.addEventListener('click', agregarCurso);

    //borrar producto desde la X desde el carrito
    contenedorCarrito.addEventListener('click', borrarProducto);

    //vaciar el carrito tocando el boton de vaciar
    botonVaciarCarrito.addEventListener('click', (e) => {

        e.preventDefault();

        arregloProductos = [];
        if (arregloProductos.length === 0) {
            contadorCarrito.innerHTML = '0';
        }
        
        crearHTML();
        sacarBotones();
        

    });

    //usar localStorage para guardar los que pongamos en el carrito
    document.addEventListener('DOMContentLoaded', () => {
        arregloProductos = JSON.parse(localStorage.getItem('producto')) || [];

        crearHTML();
        contador(arregloProductos);
    });


    //que no me muestre los botones de vaciar o pagar si no tengo nada en el carrito
    iconoCarrito.addEventListener('mouseenter', sacarBotones);

    //que se ilumine el blog donde dice la info del carrito
    irAlBlog.addEventListener('click', iluminarIcon);



}





//iluminar el blog del envio
function iluminarIcon() {
    
    blogEnvio.classList.add('animacionIcon')    
    
    setTimeout(() => {
        blogEnvio.classList.remove('animacionIcon')    
    }, 5000);
       
}

function iluminarFooter() {
    
    modelosFooter.classList.add('iluminarFooter')   
    setTimeout(() => {
        modelosFooter.classList.add('desiluminarFooter')    
    }, 3000);
}


//mostrar y cerrar carrito
imgCarrito.onclick = () => {
    submenuCarrito.classList.add('active');
    submenuCarrito.style.transition = ('all 0.5s');
    submenuCarrito.style.transform = ('translateX(-500px)');

    contadorCarrito.classList.add('esconder');

    imgCarrito.classList.add('esconder');   

    imgCerrarCarrito.classList.remove('esconder');

}

imgCerrarCarrito.onclick = () => {
    submenuCarrito.style.transition = ('all 0.75s');
    submenuCarrito.style.transform = ('translateX(500px)');
    submenuCarrito.classList.add('cerrar');

    imgCerrarCarrito.classList.add('esconder')

    imgCarrito.classList.remove('esconder') 

    contadorCarrito.classList.remove('esconder');
}

//que no hata botones de pagar y vaciar si no hay elementos
function sacarBotones() {    
    limpiarPcarrito();

    if (!contenedorCarrito.firstChild) {  
        botonVaciarCarrito.classList.add('esconder');
        botonPagarCarrito.classList.add('esconder');
        divSubtotal.classList.add('esconder');
        pMostrarEnvio.classList.add('esconder');
        

        const nadaCarrito = document.createElement('p');
        nadaCarrito.innerHTML = 'No hay nada en el carrito.';
        nadaCarrito.innerHTML = 
        '<p> No hay nada en el carrito</p><a href="productos.html#verProductos" class="iracomprar" > Ir a PRODUCTOS </a>';

        botonesCarrito.style.alignItems = 'center';
        divNadaCarrito.appendChild(nadaCarrito); 
        return;
        
    } 


    
}


//seleccionar el producto que  estoy tocando y no otro, mandarle ese al LeerDatopproducto
function agregarCurso(e) {
    //q no hagan nd los botones asi le damos nosotros la funcionalidad
    e.preventDefault();
    
    //que solo funcione si toco en el boton
    if (e.target.classList.contains('agregar-carrito')) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatoProducto(productoSeleccionado);
        iconoCarrito.classList.add('agregado');
        contadorCarrito.classList.add('agregado');
        contadorCarrito.classList.add('agregado-numero');
        e.target.textContent = 'AGREGADO';

        setTimeout(() => {
            e.target.textContent = 'Agregar al carrito';
        }, 2500);
        
        setTimeout(() => {
            e.target.textContent = 'Agregar al carrito';
            iconoCarrito.style.transition = '0.5s all';
            contadorCarrito.style.transition = '0.5s all';

            iconoCarrito.classList.remove('agregado');
            contadorCarrito.classList.remove('agregado');
            contadorCarrito.classList.remove('agregado-numero');
        }, 4000);
        
    }
    
};

//obtener los datos del producto que selecciono
//agregarlo al arreglo de los productos para luego mandarlo al html del carrito
function leerDatoProducto(producto) {
    
    //leer los datos del producto
    const infoProducto = {
        nombre: producto.querySelector('h3').textContent,
        imagen: producto.querySelector('img').src,
        precio: producto.querySelector('.precio').textContent,
        $: producto.querySelector('b').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    let precioBase = producto.querySelector('.precio').textContent;
    precioBase = parseInt(precioBase)
    //agregar la info al arreglo 
    //vamos a hacer que si agregamos dos veces el mismo producto, que nos sume una cantidad y no nos lo agregue de nuevo 
    
    if (arregloProductos.some( producto => producto.id === infoProducto.id)) {
        const productoRepetido = arregloProductos.map( producto => {
            if(producto.id === infoProducto.id) {
                producto.cantidad++;
                producto.precio = precioBase*producto.cantidad;
                return producto;
            } else {
                return producto;
            }
        })
        arregloProductos = [...productoRepetido];
    } else {
        arregloProductos = [...arregloProductos, infoProducto];   
    }

    
    
    //le pasamos el arreglo a la funcion crearHTML para justamente crear el html del carrito
    crearHTML(producto.precio, infoProducto);
}


function crearHTML(precio) {
    //contador
    contador(arregloProductos)
    console.log(arregloProductos)

    //primero hay que hacer que no se dupliquen
    
    limpiarHTML();
    
    //empezamos con para que muestre el total de lo sumado en el carrito
    let subtotalCarrito = 0;

    //creamos el html para cada elemento del arreglo
    arregloProductos.forEach( producto => {

        let precioBase = document.querySelector('.precio').textContent;
        precioBase = parseInt(precioBase)

        const row = document.createElement('tr');
        row.innerHTML =  `
        <td> <img src="${producto.imagen}" width=100px> </td>
        <td> ${producto.nombre} </td>
        <td> ${producto.$}${producto.precio} </td>
        <td> <span class="restar"> - </span> <span>${producto.cantidad}</span> <span class="sumar" > + </span></td>
        <td> <a href="#" class="borrar-curso" data-id="${producto.id}"> X </a></td>
        `;

        contenedorCarrito.appendChild(row)
     
        //funcionalidad botones de - y + cantidades
        
        const restar = row.querySelector('.restar')
        const sumar = row.querySelector('.sumar')

        restar.addEventListener('click', () => {
            if(producto.cantidad !== 1) {
                producto.cantidad--;
                producto.precio = precioBase * producto.cantidad
                crearHTML();
            } 
            
        });
        
        sumar.addEventListener('click', () => {
            producto.cantidad++;
            producto.precio = precioBase * producto.cantidad
            crearHTML();

        });


        //que me agregue los precios cada vez q sumo algo al subtotal
        subtotalCarrito = subtotalCarrito + parseInt(producto.precio)
        

    });

    //que me saque los botones si no tengo productos en el carrito
    sacarBotones();
    
    //que me los agregue si hay productos
    agregarBotones();

    //conectar localStorage
    sincronizarStorage(); 

    //PARA QUE MUESTRE EN EL CARRITO EL SUBTOTAL
    spanSubtotal.textContent = `${subtotalCarrito}`;
    calcularTotal(subtotalCarrito.textContent);

}

function sincronizarStorage() {
    localStorage.setItem('producto', JSON.stringify(arregloProductos))
}

function contador(arregloProductos) {
    let numeroContador = arregloProductos.length
    
    arregloProductos.forEach( producto => {
        //numeroContador.innerHTML = numeroContador++;
        contadorCarrito.innerHTML = numeroContador;

    
    });
    

    
    
}


//borrar producto del carrito desde la X
function borrarProducto(e) {

    //aca le vamos a decir que me de el id del producto que quiero borrar cuando toque la x
    //luego que me actualice el arreglo con los productos que tengan un id DISTINTO !== al que seleccione arriba
    if (e.target.classList.contains('borrar-curso')) {
        const productoId = e.target.getAttribute('data-id');
        arregloProductos = arregloProductos.filter( producto => producto.id !== productoId);
    } 

    //luego le pasamos d nuevo la funcion que crea el html para que borre el q tocamos    
    crearHTML();
    sacarBotones();
    if (arregloProductos.length === 0) {
        contadorCarrito.innerHTML = '0';
    }
};





function agregarBotones() {
    botonPagarCarrito.classList.remove('esconder')
    botonVaciarCarrito.classList.remove('esconder')
    divSubtotal.classList.remove('esconder');
    pMostrarEnvio.classList.remove('esconder');
}


//FUNCION PARA QUE NO SE REPITAN LOS ELEMENTOS EN EL CARRITO
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}

function limpiarPcarrito() {
    while (divNadaCarrito.firstChild) {
        divNadaCarrito.removeChild(divNadaCarrito.firstChild)
    }
}

//TODO LO DEL ENVIO
const divCalculoEnvio = document.getElementById('divCalculoEnvio');
const btnProbarOtro = document.getElementById('probarOtroEnvio');
const divSelecProvincia = document.querySelector('.divSelecProvincia');
const divSelecCiudad = document.querySelector('.divSelecCiudad');
const divSelecTipoenvio = document.querySelector('.divSelecTipoenvio');
const pTotal = document.querySelector('.totalApagar')
const btnCalcularEnvio1 = document.getElementById('calcularEnvio1');
const btnCalcularEnvio2 = document.getElementById('calcularEnvio2')
const spanEnvio = document.querySelector('.numero-envioTotal')
const opciones = document.querySelectorAll('input[name="opciones"]');
const formularioEnvio = document.querySelector('.formularioEnvio');
let opcionSeleccionada;
let totalEnvio = 0;

eventosEnvio();
function eventosEnvio() {
    //mostrar todo para calcular el envio
    btnCalcularEnvio1.addEventListener('click', mostrarCalcularEnvio)

    //leer datos de los checkers
    btnCalcularEnvio2.addEventListener('click', leerCheck)

    //volver a setear el calculo de envio
    btnProbarOtro.addEventListener('click', resetCalculo)

    

}

function mostrarCalcularEnvio() {
    divCalculoEnvio.classList.remove('esconder');
    btnCalcularEnvio1.classList.add('esconder');
    spanEnvio.textContent = '...';
}

function leerCheck(e) {
    e.preventDefault();

    for (let opcion of opciones) {

        if (opcion.checked) {
            opcionSeleccionada = opcion.value;

            if(opcionSeleccionada === 'Santa Fe') {
                divSelecProvincia.classList.add('esconder')
                divSelecCiudad.classList.remove('esconder') 

                
            } else if ( opcionSeleccionada === 'Otra provincia') {
                spanEnvio.textContent = '$ 3800'
                divCalculoEnvio.classList.add('esconder')
                btnProbarOtro.classList.remove('esconder')
                pTotal.classList.remove('esconder')
                totalEnvio = 3800
                calcularTotal('',totalEnvio)
                spanTotal.classList.remove('esconder')

            } else if ( opcionSeleccionada === 'Rosario') {
                divSelecTipoenvio.classList.remove('esconder')
                divSelecCiudad.classList.add('esconder')


            } else if (opcionSeleccionada === 'otraCiudad') {
                totalEnvio=2800
                spanEnvio.textContent = '$ 2800'
                divCalculoEnvio.classList.add('esconder')
                btnProbarOtro.classList.remove('esconder')
                pTotal.classList.remove('esconder')
                calcularTotal('',totalEnvio)
                spanTotal.classList.remove('esconder')

            } else if(opcionSeleccionada === 'retiro') {
                totalEnvio=0
                spanEnvio.textContent = '$ 0';
                divCalculoEnvio.classList.add('esconder')
                btnProbarOtro.classList.remove('esconder')
                pTotal.classList.remove('esconder')
                calcularTotal('',totalEnvio)
                spanTotal.classList.remove('esconder')

            } else if(opcionSeleccionada === 'domicilio') {
                totalEnvio = 600
                spanEnvio.textContent = '$ 600'
                divCalculoEnvio.classList.add('esconder')
                btnProbarOtro.classList.remove('esconder')
                pTotal.classList.remove('esconder')
                calcularTotal('',totalEnvio)
                spanTotal.classList.remove('esconder')
            }

            
        }

    }

    
}

function resetCalculo() {

    mostrarCalcularEnvio();

    btnProbarOtro.classList.add('esconder')
    spanTotal.classList.add('esconder')

}

function calcularTotal() {
    spanTotal.textContent = parseInt(spanSubtotal.textContent) + totalEnvio
}













