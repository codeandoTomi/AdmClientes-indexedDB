(function(){

        let DB;

        document.addEventListener("DOMContentLoaded", () =>{
            crearDB();

            if(window.indexedDB.open('crm', 1)){
                obtenerClientes();
            }
        });

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

                        const listadoClientes = document.querySelector("#listado-clientes")
                        listadoClientes.innerHTML += `
                            <tr>
                                <th> nombre: ${nombre} </th>
                        `
                        
                        cursor.continue();
                        console.log(cursor.value)

                    } else{
                        ('no hay mas registros....')
                    }
                }
            }


        }




})();

