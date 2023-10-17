

// 'use strict'

const grande    = document.querySelector('.grande')
const punto     = document.querySelectorAll('.punto')


punto.forEach( ( cadaPunto , i )=> {

    // Asignamos un CLICK a cadaPunto
    punto[i].addEventListener('click',()=>{
    // Guardar la posición de ese PUNTO
    let posicion  = i
    // Calculando el espacio que debe DESPLAZARSE el GRANDE
    let operacion = posicion * -33.3
    // MOVEMOS el grand
    grande.style.transform = `translateX(${ operacion }%)`
    // Recorremos TODOS los punto
    punto.forEach( ( cadaPunto , i )=>{
        // Quitamos la clase ACTIVO a TODOS los punto
        punto[i].classList.remove('activo')
    })
    // Añadir la clase activo en el punto que hemos hecho CLICK
    punto[i].classList.add('activo')
    })
    
})

if ( punto[0].classList.contains('activo')) {
    setInterval(() => {
        grande.style.transform = 'translateX(-33.3%)'
        punto[0].classList.remove('activo')
        punto[1].classList.add('activo')
    }, 2000);
} 



// function mover(posicion) {
//     let operacion = posicion * -33.3
//     if (posicion === 0) {
//         grande.style.transform = `translateX(-33.3%)`
//     } else if (posicion === 1) {
//         console.log('la posicion es 1')
//     } else if (posicion === 2) {
//         console.log('la posicion es 2')
//     }
// }






