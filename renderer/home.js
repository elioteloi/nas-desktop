const divFolders = document.getElementById("divFolders")
const buttonDrive = document.getElementById("buttonDrive")
const buttonProfile = document.getElementById("buttonProfile")
const buttonLoggedOut = document.getElementById("buttonLoggedOut")
const addFolder = document.getElementById("addFolder")
const addFolderButton = document.getElementById("addFolderButton")
const divInput = document.getElementById("divInput")

async function folder(params) {
    const response = await fetch(`http://server:3000/fetchFolder`, {
        method: 'post',
        headers: {
             'Content-Type': 'application/json',
        },
        body: JSON.stringify ({
            id: window.user.ID
        })
    })

    const json = await response.json()

    json.result.forEach(element => {

        const folder = document.createElement("div")
        folder.id = "folder"

        const divButtons = document.createElement("div")
        divButtons.id = "divButtons"
        
        const buttonFolder = document.createElement("button")
        buttonFolder.id = "buttonFolder"
        buttonFolder.height = 100
        buttonFolder.width = 100
        
        const imageFolder = document.createElement("img")
        imageFolder.id = "imageFolder"
        imageFolder.src = "./images/folder.png"
        imageFolder.height = 100
        imageFolder.width = 100
        imageFolder.loading = "lazy"

        const titleFolder = document.createElement("h3")
        titleFolder.innerHTML = element.foldername

        const buttonEditName = document.createElement("button")
        buttonEditName.id = "editName"
        buttonEditName.innerHTML = "Edit name"

        const buttonDeleteFolder = document.createElement("button")
        buttonDeleteFolder.id = "deleteFolder"
        buttonDeleteFolder.innerHTML = "Delete folder"
        

        

        buttonFolder.appendChild(imageFolder)
        buttonFolder.appendChild(titleFolder)

        folder.appendChild(buttonFolder)
        folder.appendChild(divButtons)
        divFolders.appendChild(folder)
        divButtons.appendChild(buttonEditName)
        divButtons.appendChild(buttonDeleteFolder)

        buttonFolder.addEventListener("click", () => {

            window.location.href = `folder.html?id=${window.user.ID}&foldername=${element.foldername}`;

        })
        
        buttonEditName.addEventListener("click", () => {

            addFolderButton.style.display = "none"

            const modalFolder = document.createElement("div")
            modalFolder.id = "modalFolder"

            const inputFolder = document.createElement("input")
            inputFolder.placeholder = "Change the name for the folder"
            inputFolder.id = "inputFolder"
            
            const buttonCreateFolder = document.createElement("button")
            buttonCreateFolder.textContent = "Update folder"
            buttonCreateFolder.id = "buttonCreateFolder"
            
            const buttonGoBack = document.createElement("button")
            buttonGoBack.textContent = "Go Back"
            buttonGoBack.id = "goBack"
            
                    

            modalFolder.appendChild(inputFolder)
            divFolders.appendChild(modalFolder)
            modalFolder.appendChild(buttonCreateFolder)
            modalFolder.appendChild(buttonGoBack)

            buttonCreateFolder.addEventListener("click", async () => {

                const response = await fetch(`http://server:3000/updateFolder`, {
                    method: "put",
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: element.id,
                        folderName: inputFolder.value
                    })
    
                    
                })
                const json = response.json()
                location.reload();

                
            })



            buttonGoBack.addEventListener("click", () => {
                addFolderButton.style.display = "block"
                modalFolder.style.display = "none"
                
            })
        })

        buttonDeleteFolder.addEventListener("click", () => {
            
            addFolderButton.style.display = "none"

            const modalFolderDelete = document.createElement("div")
            modalFolderDelete.id = "modalFolder"

            const FolderDelete = document.createElement("h3")
            FolderDelete.textContent = "Are you sure that you want to delete the folder !"
            FolderDelete.id = "FolderDelete"
            
            const buttonDeleteFolder = document.createElement("button")
            buttonDeleteFolder.textContent = "Delete folder"
            buttonDeleteFolder.id = "buttonCreateFolder"
            
            const buttonGoBack = document.createElement("button")
            buttonGoBack.textContent = "Go Back"
            buttonGoBack.id = "goBack"
            
            modalFolderDelete.appendChild(FolderDelete)
            divFolders.appendChild(modalFolderDelete)
            modalFolderDelete.appendChild(buttonDeleteFolder)
            modalFolderDelete.appendChild(buttonGoBack)

            
            buttonDeleteFolder.addEventListener("click", async () => {

                const response = await fetch(`http://server:3000/deleteFolder/${element.id}`, {
                    method: "delete",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                 const json = response.json()
                location.reload();

            })


            buttonGoBack.addEventListener("click", () => {
                addFolderButton.style.display = "block"
                modalFolderDelete.style.display = "none"

            })
        })

    })
}

folder()

addFolderButton.addEventListener("click", () => {

    addFolderButton.style.display = "none"

    const modalFolder = document.createElement("div")
    modalFolder.id = "modalFolder"

    const inputFolder = document.createElement("input")
    inputFolder.placeholder = "Create a name for the folder"
    inputFolder.id = "inputFolder"
    
    const buttonCreateFolder = document.createElement("button")
    buttonCreateFolder.textContent = "Create folder"
    buttonCreateFolder.id = "buttonCreateFolder"
    
    const buttonGoBack = document.createElement("button")
    buttonGoBack.textContent = "Go Back"
    buttonGoBack.id = "goBack"
    
    modalFolder.appendChild(inputFolder)
    divFolders.appendChild(modalFolder)
    modalFolder.appendChild(buttonCreateFolder)
    modalFolder.appendChild(buttonGoBack)
    
    buttonCreateFolder.addEventListener("click", async (e) => {

        const response = await fetch(`http://server:3000/createFolder`, {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid: window.user.ID,
                folderName: inputFolder.value
            })
        })
            const json = response.json()
            location.reload();
    })

        
    buttonGoBack.addEventListener("click", () => {
        addFolderButton.style.display = "block"
        modalFolder.style.display = "none"
    })

    
})

buttonDrive.addEventListener("click", () => {
    window.location.href = "home.html"
})


buttonProfile.addEventListener("click", () => {
    window.location.href = "profile.html"
})
