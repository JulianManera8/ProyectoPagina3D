//VARIABLES

const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-productos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const botonesCarrito = document.querySelector('.botones-carrito');
const botonVaciarCarrito = document.querySelector('.vaciar-carrito');
const botonPagarCarrito = document.querySelector('.pagar-carrito');
const divNadaCarrito = document.querySelector('.nadaCarrito');

const iconoCarrito = document.querySelector('#img-carrito');


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
    listaCursos.addEventListener('click',agregarCurso);

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

function sacarBotones() {    
    limpiarPcarrito();

    if (!contenedorCarrito.firstChild) {  
        botonVaciarCarrito.classList.add('esconder');
        botonPagarCarrito.classList.add('esconder');

        const nadaCarrito = document.createElement('p');
        nadaCarrito.innerHTML = 'No hay nada en el carrito';
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

    //agregar la info al arreglo 
    //vamos a hacer que si agregamos dos veces el mismo producto, que nos sume una cantidad y no nos lo agregue de nuevo 
    
    if (arregloProductos.some( producto => producto.id === infoProducto.id)) {
        const productoRepetido = arregloProductos.map( producto => {
            if(producto.id === infoProducto.id) {
                producto.cantidad++;
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
    crearHTML();
}


function crearHTML() {
    //primero hay que hacer que no se dupliquen
    limpiarHTML();

    //creamos el html para cada elemento del arreglo
    arregloProductos.forEach( producto => {
        const row = document.createElement('tr');
        row.innerHTML =  `
        <td> <img src="${producto.imagen}" width=100px> </td>
        <td> ${producto.nombre} </td>
        <td> ${producto.$}${producto.precio} </td>
        <td> ${producto.cantidad} </td>
        <td> <a href="#" class="borrar-curso" data-id="${producto.id}"> X </a></td>
        `;

        contenedorCarrito.appendChild(row)

    });

    //que me saque los botones si no tengo productos en el carrito
    sacarBotones();
    
    //que me los agregue si hay productos
    agregarBotones();

    //conectar localStorage
    sincronizarStorage(); 
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


