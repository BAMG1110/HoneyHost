let showDivA = true;
let dispositivos_seleccionados = []
let dispositivos

// creacion de componentes
function createDeviceList(deviceList, view) {
    let device_list_content = document.getElementById('list_content')
    for (const branch in deviceList){
        const branchContainer = document.createElement('div')
        
        const branchName = document.createElement('h3')
        branchName.textContent = deviceList[branch]['name']
        branchContainer.appendChild(branchName)
        
        for (const device in deviceList[branch]['devices']){
            let deviceInfo = [
                deviceList[branch]['devices'][device]['device_type'],
                deviceList[branch]['devices'][device]['ip']
            ]

            const deviceContainer = document.createElement('div')
            deviceContainer.classList.add('dispositivo', 'hover', 'bgRed')
            deviceContainer.setAttribute("id", deviceInfo[1])

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
    const consoleDiv = document.createElement('div');
    consoleDiv.addEventListener('click', showConsole);
    consoleDiv.addEventListener('contextmenu', removeHostConsole);
    consoleDiv.setAttribute('id', 'div_'+host)
    consoleDiv.classList.add('consola', 'hover');
    
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
    const textArea = document.createElement('textarea')
    textArea.setAttribute('id', 'consola_'+host)
    textArea.classList.add('hidden', 'code_area')
    
    // acciones
    const send = document.createElement('button')
    send.textContent = 'Ejecutar'

    consoleDiv.appendChild(header);
    consoleDiv.appendChild(textArea)
    consoleDiv.appendChild(send)

    view_content.appendChild(consoleDiv)
}

// peticiones al servidor
async function fetchDevices(){
    const response = await fetch("/api/devices")
    let deviceList = await response.json()
    console.log('fetchDevices: ', deviceList)
    return deviceList
}

console.log('networkUtil')