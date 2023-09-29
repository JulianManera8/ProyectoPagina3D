//VARIABLES

const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-productos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const botonesCarrito = document.querySelector('.botones-carrito');
const botonVaciarCarrito = document.querySelector('.vaciar-carrito');
const botonPagarCarrito = document.querySelector('.pagar-carrito');
const divNadaCarrito = document.querySelector('.nadaCarrito');
const divSubtotal = document.querySelector('.subtotal');
const spanSubtotal = document.querySelector('.precio-subtotal');
const iconoCarrito = document.querySelector('#img-carrito');
const imgCarrito = document.getElementById('img-carrito');
const imgCerrarCarrito = document.getElementById('img-close');
const submenuCarrito = document.querySelector('.submenu')

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
    listaCursos.addEventListener('click', agregarCurso);

    //borrar producto desde la X desde el carrito
    contenedorCarrito.addEventListener('click', borrarProducto);

    //vaciar el carrito tocando el boton de vaciar
    botonVaciarCarrito.addEventListener('click', (e) => {

        e.preventDefault();
        arregloProductos = [];
        crearHTML();
        sacarBotones();

    });

    //usar localStorage para guardar los que pongamos en el carrito
    document.addEventListener('DOMContentLoaded', () => {
        arregloProductos = JSON.parse(localStorage.getItem('producto')) || [];

        crearHTML();
    });


    //que no me muestre los botones de vaciar o pagar si no tengo nada en el carrito
    iconoCarrito.addEventListener('mouseenter', sacarBotones);

    

}

//mostrar y cerrar carrito
imgCarrito.onclick = () => {
    submenuCarrito.classList.add('active');
    imgCarrito.classList.add('esconder');
    imgCerrarCarrito.classList.remove('esconder');
}
imgCerrarCarrito.onclick = () => {
    submenuCarrito.classList.remove('active');
    imgCerrarCarrito.classList.add('esconder')
    imgCarrito.classList.remove('esconder') 
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
        '<p> No hay nada en el carrito</p> <br><a href="#lista-productos" class="iracomprar" > Ir a PRODUCTOS </a>';

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
}

function sincronizarStorage() {
    localStorage.setItem('producto', JSON.stringify(arregloProductos))
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
const btnCalcularEnvio1 = document.getElementById('calcularEnvio1');
const spanEnvio = document.querySelector('.numero-envioTotal')

const inputSantafe = document.getElementById('santaFe').value;
const inputOtraProv = document.getElementById('otraProvincia').value;
const inputRosario = document.getElementById('rosario').value;
const inputOtraCiudad = document.getElementById('otraCiudad').value;



eventosEnvio();
function eventosEnvio() {
    //mostrar todo para calcular el envio
    btnCalcularEnvio1.addEventListener('click', mostrarCalcularEnvio)





}

function mostrarCalcularEnvio() {
    divCalculoEnvio.classList.remove('esconder');
    btnCalcularEnvio1.classList.add('esconder');
    spanEnvio.textContent = '...';
}

