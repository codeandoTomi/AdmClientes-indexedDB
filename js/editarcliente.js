(function(){
    let idCliente;
    let DB;
    const nombreInput = document.querySelector("#nombre");
    const emailInput = document.querySelector("#email");
    const TelefonoInput = document.querySelector("#telefono");
    const empresaInput = document.querySelector("#empresa");

    const formulario = document.querySelector(".form")



    document.addEventListener('DOMContentLoaded', () => {
        conectarDB();
        /////////////////////////////////////
        formulario.addEventListener('submit', actualizarCliente);


        /////////////////////////////////// VERIFICAR ID..... DE LA URL....
        const parametrosURL = new URLSearchParams(window.location.search);
        idCliente = parametrosURL.get('id');
        // console.log(idCliente);
        if(idCliente){
            setTimeout( () =>{
                obtenerCliente(idCliente);
            }, 1000)
        }


    });
    ///////////////////////////////////////////////////////////
    function actualizarCliente(e){
        e.preventDefault();

        if( nombreInput.value === "" || emailInput.value === "" || TelefonoInput === "" || empresaInput === ""){
            // console.log("hubo un error.");
            imprimirAlerta("TODOS LOS CAMPOS SON OBLIGATORIOS", "error");
            return;
        } 
        ///////// actulizar cliente

        const clienteActualizado = {
            nombre: nombreInput.value,
            email: emailInput.value,
            telefono: TelefonoInput.value,
            empresa: empresaInput.value,
            id: Number(idCliente)
        }

        console.log(clienteActualizado)
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm')

        objectStore.put(clienteActualizado);

        transaction.oncomplete = function(){
            console.log("editado correctamente..");
            imprimirAlerta("Editado Correctamente..");

            setTimeout(() =>{
                window.location.href = 'index.html'
            }, 2000)
        }
        transaction.onerror = function(){
            console.log("hubo un error..");
            imprimirAlerta("Hubo un error", "error")
        }
    }

    ///////////////////////////////////////////////////////
    function obtenerCliente(id){
        // console.log(id);
        const transaction = DB.transaction(['crm'], 'readwrite'); /// ademas de 'readwrite', puede ser 'readonly'..
        const objectStore = transaction.objectStore('crm');

        const cliente = objectStore.openCursor();
        // console.log(objectStore)
        cliente.onsuccess = function(e){
            const cursor = e.target.result;
            if(cursor){
                // console.log(cursor.value)
                if(cursor.value.id === Number(id)){
                    // console.log(cursor.value)
                    llenarFormulario(cursor.value);
                }
                cursor.continue();
            }
        }

    }
    ////////////////////////////////////////////////////////
    function llenarFormulario(datosCliente){
        const { nombre, email, telefono, empresa } = datosCliente;

        nombreInput.value = nombre;
        emailInput.value = email;
        TelefonoInput.value = telefono;
        empresaInput.value = empresa;
    }
    ///////////////////////////////////////////////////////
    function conectarDB(){
        const abrirConexion = window.indexedDB.open('crm', 1);


            abrirConexion.onerror = function(){
                console.log('hubo un error');
            }
            abrirConexion.onsuccess = function(){
                DB = abrirConexion.result;
            }
    }



})();