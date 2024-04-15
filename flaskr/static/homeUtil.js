// funciones dinamicas
function showConsole(event){
    for (const child of event.target.children) {
        if (child.classList.contains('console')) {
            if(child.classList.contains('hidden')){
                child.classList.toggle('hidden', false)
            } else {
                child.classList.toggle('hidden', true)
            }
        }
    }
}
async function addHostConsole(event) {
    host = event.target.id
    
    if (!event.target.classList.contains('selected')) {
        dispositivos_seleccionados.push(host)
        event.target.classList.add('selected');
        // consola_individual.appendChild(contenedor)
        createConsole(host)
        await openConn(host)
        console.log('add', host, dispositivos_seleccionados)
    }
}
function removeHostConsole(event) {
    event.preventDefault();
    host = event.target
    parent = host.parentElement
    console.log('parent', parent)
    
    console.log('remove', dispositivos_seleccionados, host);
    if (host.classList.contains('selected')) {
        dispositivos_seleccionados.pop(host)
        host.classList.remove('selected');
        parent.removeChild(document.getElementById(host))
    } else if (host.classList.contains('consoleContainer')){
        id = host.id.replace('div_', '')
        li = document.getElementById(id)
        li.classList.remove('selected');
        dispositivos_seleccionados.pop(id)
        parent.removeChild(document.getElementById('div_'+id))
    }
}
function addMultipleHost(event) {
    tipoDispositivo = event.target

    for (const child of tipoDispositivo.children) {
        if (child.classList.contains('dispositivo')){
            if (!child.classList.contains('selected')){
                child.click();
            }
        }
    }
}
function removeMultipleHost(event) {
    event.preventDefault();
    tipoDispositivo = event.target

    for (const child of tipoDispositivo.children) {
        if (child.classList.contains('dispositivo')){
            if (child.classList.contains('selected')){
                child.dispatchEvent(eventoClickDerecho);
            }
        }
    }
}
function loadText(event, id_consola) {
    const id = 'code_' + id_consola;
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        document.getElementById(id).value = e.target.result;
    }

    reader.readAsText(file);
}
async function sendCode(host) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(host)
    };

    // Realizar la solicitud fetch
    await fetch('/api/exec', options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema con la solicitud: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta de la API:', data);
            // Haz algo con la respuesta si es necesario
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
        });
}
async function pingDeviceList() {
    for (const branch in deviceList){
        for (const device in deviceList[branch]['devices']){
            console.log(deviceList[branch]['devices'][device]['ip'])
            const deviceBg = document.getElementById(deviceList[branch]['devices'][device]['ip'])
            deviceBg.classList.add('bgPending');

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(deviceList[branch]['devices'][device]['ip'])
            };

            // Realizar la solicitud fetch
            await fetch('/api/ping', options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Hubo un problema con la solicitud: ' + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Respuesta de la API:', data);
                    // Haz algo con la respuesta si es necesario
                    if(data['ping']){
                        deviceBg.classList.remove('bgPending'); // Elimina la clase bgRed
                        deviceBg.classList.add('bgAcepted'); // Elimina la clase bgRed
                    } else {
                        deviceBg.classList.remove('bgPending'); // Elimina la clase bgRed
                        deviceBg.classList.add('bgRejected'); // Elimina la clase bgRed
                    }

                })
                .catch(error => {
                    console.error('Error al realizar la solicitud:', error);
                });
            }
    }
}
async function openConn(host){
    const connH4 = document.getElementById('conn_'+host)
    console.log('openConn', host)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(host)
    };

    // Realizar la solicitud fetch
    await fetch('/api/conn', options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema con la solicitud: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta de la API:', data);
            // Haz algo con la respuesta si es necesario
            console.log('conn',data['conn'])
            if(data['conn']){
                connH4.textContent = 'conexión ssh: ok'
            } else {
                connH4.textContent = 'conexión ssh: error'
            }

        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
        }); 
}

async function inicio() {
    deviceList = await fetchDevices()
    createDeviceList('network')
    pingDeviceList()
    console.log("network")
}

inicio()