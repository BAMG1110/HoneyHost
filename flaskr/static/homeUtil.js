let deviceList

async function inicio() {
    deviceList = await fetchDevices()
    createDeviceList()
    console.log("home")
}

inicio()