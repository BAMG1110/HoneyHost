let deviceList

async function addBranchOptions() {
    deviceList = await fetchDevices()
    createDeviceList()

    let branchSelect = document.getElementById('branch_id')
    
    // Agregar una opción vacía por defecto
    const defaultOption = document.createElement('option')
    defaultOption.value = ''
    defaultOption.text = '-- Selecciona una sucursal --'
    branchSelect.add(defaultOption)
    
    for (const branch in deviceList){
        const option = document.createElement('option')
        option.value = branch
        option.text = deviceList[branch]['name']
        branchSelect.add(option)
    }
    console.log('insersion de sucursales')
}

addBranchOptions()