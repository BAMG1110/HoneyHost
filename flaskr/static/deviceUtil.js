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

fetchFormBranches();