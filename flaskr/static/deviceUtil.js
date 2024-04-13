let deviceList

function createDeviceList() {
    device_list_content = document.getElementById('device_list_content')
    console.log(deviceList)
    // for (const branch in deviceList){
    //     for (const device in deviceList[branch])
    //         console.log('device', deviceList[branch][device])
        // const container = document.createElement('div')

        // const hostname = document.createElement('h3')
        // hostname.textContent = deviceList[device][1]

        // const branch_id = document.createElement('p')
        // branch_id.textContent = deviceList[device][2]
        // const ip = document.createElement('p')
        // ip.textContent = deviceList[device][3]
        // const device_type = document.createElement('p')
        // device_type.textContent = deviceList[device][4]
        // const Os = document.createElement('p')
        // Os.textContent = deviceList[device][5]
        // const username = document.createElement('p')
        // username.textContent = deviceList[device][6]
        // const password = document.createElement('p')
        // password.textContent = deviceList[device][7]
        // const secret = document.createElement('p')
        // secret.textContent = deviceList[device][8]

        // container.appendChild(hostname);
        // container.appendChild(branch_id);
        // container.appendChild(ip);
        // container.appendChild(device_type);
        // container.appendChild(Os);
        // container.appendChild(username);
        // container.appendChild(password);
        // container.appendChild(secret);

        // device_list_content.appendChild(container)
    // }
}

async function fetchFormBranches() {
    const response = await fetch("/api/branches");
    branches = await response.json();
    const branchSelect = document.getElementById('branch_id');

    // Agregar una opción vacía por defecto
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = '-- Selecciona una sucursal --';
    branchSelect.add(defaultOption);

    for (const branch in branches) {
        const option = document.createElement('option');
        option.value = branches[branch][0];
        option.text = branches[branch][1];
        branchSelect.add(option);
    }
}

async function fetchDevices(){
    const response = await fetch("/api/devices");
    deviceList = await response.json();
    createDeviceList()
}

fetchFormBranches();
fetchDevices()