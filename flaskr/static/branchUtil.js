function createBranchList(branches) {
    branch_list_content = document.getElementById('branch_list_content')
    for (const branch in branches){
        const container = document.createElement('div')
        const hostname = document.createElement('h3')
        hostname.textContent = branches[branch][1]
        container.appendChild(hostname);
        branch_list_content.appendChild(container)
    }

}

async function fetchBranches(){
    const response = await fetch("/api/branches");
    branches = await response.json();

    createBranchList(branches)
}

fetchBranches()