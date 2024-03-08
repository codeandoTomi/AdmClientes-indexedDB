(function(){
    let DB;
    const formulario = document.querySelector(".form");


    document.addEventListener("DOMContentLoaded", () =>{

        conectarDB();
        
        formulario.addEventListener('submit', validarCliente)
    })  
    //////////////////////////////////////////////////////////////////////////////////////////////
    function conectarDB(){
        const abrirConexion = window.indexedDB.open('crm', 1);
        //////// ///////////
        abrirConexion.onerror = function(){
            console.log("hubo un error")
        };
        ////////////////////
        abrirConexion.onsuccess = function(){
            DB = abrirConexion.result;
        };

    };
    ///////////////////////////////////////
    function validarCliente(e){
        e.preventDefault();

        // console.log("q onda perro")
        const inputNombre = document.querySelector("#nombre").value;
        const inputEmail = document.querySelector("#email").value;
        const inputTelefono = document.querySelector("#telefono").value;
        const inputEmpresa = document.querySelector("#empresa").value;

        if(inputNombre === "" || inputEmail === '' || inputTelefono === '' || inputEmpresa === ''){
            imprimirAlerta("Todos los campos son obligatorios", "error");

            return;
        }

        const cliente = {
            nombre: inputNombre,
            email: inputEmail,
            telefono: inputTelefono,
            empresa: inputEmpresa,
        }
        // console.log(cliente)
        cliente.id = Date.now();

        crearNuevoCliente(cliente);

    }
    function crearNuevoCliente(cliente){
        const transaction = DB.transaction(["crm"], "readwrite");
        const objectStore = transaction.objectStore('crm');

        objectStore.add(cliente)

        transaction.onerror = function(){
            console.log("hubo un errorrr amigoooo");
            imprimirAlerta("Error. Mail ya registrado en Base de Datos.", "error")
        }
        transaction.oncomplete = function(){
            // console.log("cliente Agregado eeee");
            imprimirAlerta("Cliente agregado correctamente.")

            setTimeout(() =>{
                window.location.href = 'index.html'
            }, 2000)
        }
    }


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





















})();