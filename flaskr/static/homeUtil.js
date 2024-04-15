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
function addHostConsole(event) {
    host = event.target.id
    
    if (!event.target.classList.contains('selected')) {
        dispositivos_seleccionados.push(host)
        event.target.classList.add('selected');
        // consola_individual.appendChild(contenedor)
        createConsole(host)
        
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
function loadText(obj, e, id_consola){
    console.log(e)
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
        document.getElementById(id_consola).value = e.target.result;
    }

    reader.readAsText(file);
}
function sendCode(event, host){
    console.log('ejecutando codigo', host)
}
async function inicio() {
    deviceList = await fetchDevices()
    createDeviceList('network')
    console.log("network")
}

inicio()