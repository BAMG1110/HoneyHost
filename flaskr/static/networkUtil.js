let showDivA = true;
let dispositivos_seleccionados = []
let dispositivos

// funciones dinamicas
function toggleView(event){
    event.preventDefault();
    const divA = document.getElementById('consola_global');
    const divB = document.getElementById('consola_individual');
    const titulo = document.getElementById('titulo_consola')

    showDivA = !showDivA;
    titulo.innerHTML = showDivA? 'Consola induvidual':'Consola global'
    divB.classList.toggle('hidden', !showDivA);
    divA.classList.toggle('hidden', showDivA);
}
function showConsole(event){
    for (const child of event.target.children) {
        if (child.classList.contains('code_area')) {
            if(child.classList.contains('hidden')){
                child.classList.toggle('hidden', false)
            } else {
                child.classList.toggle('hidden', true)
            }
        }
    }
    // divB.classList.toggle('hidden', !showDivA);
}
function addHost(event) {
    host = event.target.id
    id = 'consola_'+host

    // se crea elemento consola
    const contenedor = document.createElement('div');
    contenedor.setAttribute("id", id)
    contenedor.classList.add('consola');

    const branchHeader = document.createElement('p');
    branchHeader.textContent = host;
    contenedor.appendChild(branchHeader);

    if (!event.target.classList.contains('selected')) {
        dispositivos_seleccionados.push(host)
        event.target.classList.add('selected');
        // consola_individual.appendChild(contenedor)
        createConsole(host)
        
        console.log('add', host, dispositivos_seleccionados)
    }
    conectar(host)
}
function removeHost(event) {
    event.preventDefault();
    host = event.target

    if (host.classList.contains('selected')) {
        dispositivos_seleccionados.pop(host)
        host.classList.remove('selected');
        consola_individual.removeChild(document.getElementById('div_'+host.id))
        
    } else if (host.classList.contains('consola')){
        id = host.id.replace('div_', '')
        li = document.getElementById(id)
        li.classList.remove('selected');
        dispositivos_seleccionados.pop(id)
        consola_individual.removeChild(document.getElementById('div_'+id))
    }
    console.log('remove', dispositivos_seleccionados, host);
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

// creacion de componentes
function createList(devices){
    const lista_dispositivos = document.getElementById('device_content')
    
    const container = document.createElement('div')

    for (const device in devices) {
        console.log(devices[device])

        const hostname = document.createElement('h3');
        hostname.textContent = devices[device][1];

        const ip = document.createElement('p');
        ip.textContent = devices[device][3];
        
        container.appendChild(hostname);
        container.appendChild(ip);
    }

    lista_dispositivos.appendChild(container)
}
function createConsole(host){
    const consola_individual = document.getElementById('consola_individual')

    const consolaDiv = document.createElement('div');
    consolaDiv.addEventListener('click', showConsole);
    consolaDiv.addEventListener('contextmenu', removeHost);
    consolaDiv.setAttribute('id', 'div_'+host)
    consolaDiv.classList.add('consola', 'hover');
    
    const consolaTA = document.createElement('textarea')
    consolaTA.setAttribute('id', 'consola_'+host)
    consolaTA.classList.add('hidden', 'code_area')
    
    const consoleHeader = document.createElement('h3');
    consoleHeader.textContent = host;
    
    consolaDiv.appendChild(consoleHeader);
    consolaDiv.appendChild(consolaTA)
    consola_individual.appendChild(consolaDiv)
}

// peticiones al servidor
async function ping(d){
    const htmlObj = document.getElementById(d['info']['host']+'_'+d['info']['ip'])
    
    // se cambia el bg para vizualizar el proceso
    htmlObj.classList.add("bgPending")
    
    const ping = await fetch("/api/ping", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(d),
    })
    const x = await ping.json()
    
    // se cambia el bg acorde al resultado
    const bg = x['conn']? 'bgAcepted':'bgRejected'
    htmlObj.classList.add(bg)
    htmlObj.classList.remove("bgPending")
}

async function conectar(d){

    console.log('conectando ...', d)
}

// al iniciar
async function fetchDevices() {
    const response = await fetch("/api/devices");
    dispositivos = await response.json();
    // se muestran los dispositivos registrados
    // estado: desconectado
    createList(dispositivos)

    // ping a todos los dispositivos registrados
    // estado: pendiente > conectado/desconectado
    // for (s in dispositivos){
    //     for(td in dispositivos[s]){
    //         for(d in dispositivos[s][td]){
    //             ping(dispositivos[s][td][d])
    //         }
    //     }
    // }
}