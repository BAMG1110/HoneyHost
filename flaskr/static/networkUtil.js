let showDivA = true;
let dispositivos_seleccionados = []
let deviceList

// creacion de componentes
function createDeviceList(view) {
    let device_list_content = document.getElementById('list_content')
    for (const branch in deviceList){
        const branchContainer = document.createElement('div')
        
        const branchName = document.createElement('h3')
        branchName.textContent = deviceList[branch]['name']
        branchContainer.appendChild(branchName)
        
        for (const device in deviceList[branch]['devices']){

            const deviceContainer = document.createElement('div')
            deviceContainer.classList.add('dispositivo', 'hover')
            deviceContainer.setAttribute("id", deviceList[branch]['devices'][device]['ip'])

            // segun el valor de view, es la funcion a ejecutar
            switch(view){
                case 'network':
                    console.log('network :)')
                    deviceContainer.addEventListener('click', addHostConsole)
                    break
                case 'devices':
                    console.log('devices :)')
                    deviceContainer.addEventListener('click', updateDevice)
                    break
            }
            // deviceContainer.addEventListener('contextmenu', removeHost)

            const hostname = document.createElement('p')
            hostname.textContent = deviceList[branch]['devices'][device]['hostname']

            const ip = document.createElement('p')
            ip.textContent = deviceList[branch]['devices'][device]['ip']

            deviceContainer.appendChild(hostname)
            deviceContainer.appendChild(ip)
            
            branchContainer.appendChild(deviceContainer)
        }

        device_list_content.appendChild(branchContainer)
    }
}

function createConsole(host){
    const view_content = document.getElementById('view_content')

    // encontrar datos en la lista de dispositivos
    for(const branch in deviceList){
        for(const device in deviceList[branch]['devices']){
            if(deviceList[branch]['devices'][device]['ip'] == host){
                deviceInfo = deviceList[branch]['devices'][device]
                break
            }
        }
    }

    // contenedor
    console.log('deviceInfo', deviceInfo)
    const container = document.createElement('div');
    container.addEventListener('click', showConsole);
    container.addEventListener('contextmenu', removeHostConsole);
    container.setAttribute('id', 'div_'+host)
    container.classList.add('consoleContainer', 'hover');
    
    // informacion del dispositivo
    const header = document.createElement('div');
    header.classList.add('consoleHeader');
    
    const hostname = document.createElement('h3')
    hostname.textContent = deviceInfo['hostname']
    header.appendChild(hostname)
    
    const deviceType = document.createElement('p')
    deviceType.textContent = 'tipo: ' + deviceInfo['device_type']
    header.appendChild(deviceType)
    
    const ip = document.createElement('p')
    ip.textContent = 'ip: ' + deviceInfo['ip']
    header.appendChild(ip)
    
    // area comandos
    const consoleDiv = document.createElement('div');
    consoleDiv.classList.add('hidden', 'console');
    
    const textArea = document.createElement('textarea')
    textArea.setAttribute('id', 'code_'+host)
    textArea.classList.add('code_area')
    consoleDiv.appendChild(textArea)
    
    // acciones
    const send = document.createElement('button')
    send.textContent = 'Ejecutar'
    send.addEventListener('click', (event)=>{sendCode(event, host)})
    consoleDiv.appendChild(send)

    container.appendChild(header)
    container.appendChild(consoleDiv)

    view_content.appendChild(container)
}

// peticiones al servidor
async function fetchDevices(){
    const response = await fetch("/api/devices")
    deviceList = await response.json()
    console.log('fetchDevices: ', deviceList)
    return deviceList
}

console.log('networkUtil')