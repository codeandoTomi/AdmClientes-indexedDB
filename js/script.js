(function(){

        let DB;
        const listadoClientes = document.querySelector("#listado-clientes");


        document.addEventListener("DOMContentLoaded", () =>{
            crearDB();

            if(window.indexedDB.open('crm', 1)){
                obtenerClientes();
            }

            listadoClientes.addEventListener('click', eliminarRegistro);

        });
        ////////////////////////////////////////////////////////
        function eliminarRegistro(e){
            // console.log(e.target);
            if(e.target.classList.contains('eliminar')){
                // console.log("diste click en eliminarrrrr....")

                const idEliminar = Number(e.target.dataset.cliente);
                // console.log(idEliminar)

                const confirmar = confirm("Desea eliminar el cliente?");
                // console.log(confirmar)
                if(confirmar === true){
                    const transaction = DB.transaction(['crm'], 'readwrite');
                    const objectStore = transaction.objectStore('crm');

                    objectStore.delete(idEliminar);

                    transaction.oncomplete = function(){
                        console.log("eliminandoooo")
                        
                        e.target.parentElement.parentElement.remove();
                    }

                    transaction.onerror = function(){
                        console.log('hubo un error');
                    }



                }

            }

        }

        /////// FFUNNCION QUE CREA LA BASE DE DATOS DE INDEXDB.
        function crearDB(){
            const crearDATABASE = window.indexedDB.open('crm', 1);

            crearDATABASE.onerror = function(){
                console.log("hubo un error")
            }

            crearDATABASE.onsuccess = function(){
                DB = crearDATABASE.result;
            }

            crearDATABASE.onupgradeneeded = function(e){
                const db = e.target.result;
                const objectStore = db.createObjectStore("crm", { keyPath: "id" , autoIncrement: true });

                objectStore.createIndex("nombre", "nombre", {unique: false});
                objectStore.createIndex("email", "email", {unique: true});
                objectStore.createIndex("telefono", "telefono", {unique: false});
                objectStore.createIndex("empresa", "empresa", {unique: false});
                objectStore.createIndex("id", "id", {unique: true});

                console.log("db lista y creada")
            }
        }

    //////////////////////////////////////////////////////////////
        function obtenerClientes(){
            const abrirConexion = window.indexedDB.open('crm', 1);


            abrirConexion.onerror = function(){
                console.log('hubo un error');
            }
            abrirConexion.onsuccess = function(){
                DB = abrirConexion.result;

                const objectStore = DB.transaction('crm').objectStore('crm');

                objectStore.openCursor().onsuccess = function(e){
                    const cursor = e.target.result;

                    if(cursor){
                        const { nombre, empresa, email, telefono, id } = cursor.value;

                        
                        listadoClientes.innerHTML += `
                            <tr>
                                <td> ${nombre} </td>
                                <td> ${telefono} </td>
                                <td> ${empresa} </td>
                                <td> ${email} </td>
                                <td>
                                    <a href="neditarcliente.html?id=${id}" class="verde"> Editar </a>
                                    <a href="#" data-cliente="${id}" class="rojo eliminar"> Eliminar </a>
                                </td>
                            </tr>
                        `
                        
                        cursor.continue();
                        // console.log(cursor.value)

                    } else{
                        ('no hay mas registros....')
                    }
                }
            }


        }




})();

