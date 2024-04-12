function createDeviceList(devices) {
    device_list_content = document.getElementById('device_list_content')
    for (const device in devices){
        console.log(devices[device][3])
        const container = document.createElement('div')

        const hostname = document.createElement('h3')
        hostname.textContent = devices[device][1]

        const ip = document.createElement('p')
        ip.textContent = devices[device][3]

        container.appendChild(hostname);
        container.appendChild(ip);

        device_list_content.appendChild(container)
    }
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
        option.value = branches[branch][1];
        option.text = branches[branch][1];
        branchSelect.add(option);
    }
}

async function fetchDevices(){
    const response = await fetch("/api/devices");
    devices = await response.json();

    createDeviceList(devices)
}

fetchFormBranches();
fetchDevices()