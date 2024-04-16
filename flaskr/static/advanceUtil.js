async function findMac() {
    // Obtener la dirección MAC ingresada por el usuario
    var macAddress = document.getElementById("macAddressInput").value;
    console.log('findMac', macAddress)
    let deviceList = await fetchDevices()
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([macAddress, deviceList])
    };

    // Realizar la solicitud fetch
    await fetch('/api/mac', options)
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