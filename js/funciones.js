const formulario = document.querySelector(".form");
//////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////
function imprimirAlerta(mensaje, tipo){
    const alerta = document.querySelector(".alerta")

    if(!alerta){

        const divMensaje = document.createElement('div');
        divMensaje.classList.add("mensajeDiv", "alerta")

        if(tipo === "error"){
        divMensaje.classList.add("mensajeError");
        } else{
        divMensaje.classList.add("mensajeCorrecto");
        }   
    
        divMensaje.textContent = mensaje;
    
        formulario.appendChild(divMensaje);

        setTimeout(() =>{
        divMensaje.remove();
        }, 3000)

    }

    
}