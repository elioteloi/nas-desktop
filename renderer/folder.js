const buttonGoBack = document.getElementById("button-go-back")
const file = document.getElementById("file")
const upload = document.getElementById("upload")
const divImage = document.getElementById("div-image")

window.addEventListener("load", () => {
    const params = new URLSearchParams(window.location.search);
            const id = params.get("id");
            const foldername = params.get("foldername");
            
    async function FetchPicture(params) {
        const response = await fetch(`http://server:3000/fetchFile`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                id: id, 
                folder: foldername
            })
        })
        const json = await response.json()
        json.result.forEach((element) => {

            
            let img = document.createElement("img")
            img.src = `http://server:3000/path_Of_Drive/${element.userdrive}/${element.foldername}/${element.filename}`
            img.width = 200
            img.id = "file"
            divImage.appendChild(img);
            

        })
    }

    FetchPicture()
})

upload.addEventListener("click", () => {
    
    const fileUpload = file.files[0]

    const formData = new FormData()
        formData.append("photos", fileUpload)
        formData.append("ID", 1)
        formData.append("folder", "test")
    
    async function pictures(params) {
    const response = await fetch(`http://server:3000/createFile`, {
        method: "POST",  
        body: formData
    })
    const json = await response.json()
    location.reload();

}
    pictures()
})




buttonGoBack.addEventListener("click",() => {
    window.location.href = "home.html"
})


