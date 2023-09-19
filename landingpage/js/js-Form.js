//darle la visibilidad al formulario cuando toquemos en enviar correo electronico
//es lo primero de todo
const seleccionarCorreo = document.querySelector('.texto-email');
const visibilidadFormulario = document.querySelector('.flex-container');
const cerrarForm = document.querySelector('.cerrar-form');

seleccionarCorreo.addEventListener('click', () => {
    visibilidadFormulario.style.display = 'flex';
})

cerrarForm.addEventListener('click', () => {
    visibilidadFormulario.style.display = 'none'
})

