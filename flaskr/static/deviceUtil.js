let deviceList

function createDeviceList() {
    device_list_content = document.getElementById('device_list_content')
    for (const branch in deviceList){
        const branchContainer = document.createElement('div')
        
        const branchName = document.createElement('h3')
        branchName.textContent = deviceList[branch]['name']
        branchContainer.appendChild(branchName)
        
        for (const device in deviceList[branch]['devices']){
            let deviceInfo = [
                deviceList[branch]['devices'][device]['hostname'],
                deviceList[branch]['devices'][device]['device_type'],
                deviceList[branch]['devices'][device]['ip']
            ]

            const deviceContainer = document.createElement('div')
            deviceContainer.classList.add('dispositivo', 'hover', 'bgRed')
            deviceContainer.setAttribute("id", deviceInfo[0]+'_'+deviceInfo[1]+'_'+deviceInfo[2])
            
            // deviceContainer.addEventListener('click', addHost)
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

async function addBranchOptions() {
    const branchSelect = document.getElementById('branch_id')

    // Agregar una opción vacía por defecto
    const defaultOption = document.createElement('option')
    defaultOption.value = ''
    defaultOption.text = '-- Selecciona una sucursal --'
    branchSelect.add(defaultOption)

    for (const branch in deviceList){
        console.log(deviceList[branch])
        const option = document.createElement('option')
        option.value = branch
        option.text = deviceList[branch]['name']
        branchSelect.add(option)
    }
}

async function fetchDevices(){
    const response = await fetch("/api/devices")
    deviceList = await response.json()
    createDeviceList()
    addBranchOptions()
}

fetchDevices()