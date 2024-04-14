let branchList
function createBranchList() {
    branch_list_content = document.getElementById('list_content')
    console.log('lista de sucursales', branchList)

    for (const branch in branchList){
        const container = document.createElement('div')
        const hostname = document.createElement('h3')
        hostname.textContent = branchList[branch]['name']
        container.appendChild(hostname);
        branch_list_content.appendChild(container)
    }

}

async function fetchBranches(){
    const response = await fetch("/api/branches");
    branchList = await response.json();

    createBranchList()
}

fetchBranches()