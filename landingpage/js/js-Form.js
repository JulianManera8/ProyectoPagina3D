
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
        nombreApellido: '',
        email: '',
        asunto: '',
        mensaje: '',
    }

    //EVENTOSLISTENEROS
    inputNombreApellido.addEventListener('input', validar);
    inputEmail.addEventListener('change', validar);
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
            return
        } 

        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarError(`Tienes que escribir bien el email`, e.target.parentElement);
            correo[e.target.name] = '';
            validarObjCorreo(correo);
            return;
        }

        limpiarAlertas(e.target.parentElement);

        correo[e.target.name] = e.target.value.trim().toLowerCase();
        console.log(correo);
        validarObjCorreo(correo);

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

        correo.nombreApellido = '';
        correo.email = '';
        correo.asunto = '';
        correo.mensaje = '';
        
        formulario.reset(); 
        validarObjCorreo(correo);

        const alertas = document.querySelectorAll('.alertaError');
        alertas.forEach( function(alert) {
            alert.remove();
        })
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

    
  

    inputNombreApellido.onclick = () => {
        labelNombreApellido.style.transform = 'translateY(-9px)';
    }
    
    inputEmail.onclick = () => {
        labelEmail.style.transform = 'translateY(-9px)';
    }
    
    inputAsunto.onclick = () => {
        labelAsunto.style.transform = 'translateY(-9px)';
    }
    inputMensaje.onclick = () => {
        labelMensaje.style.transform = 'translateY(-9px)';
    }
});















