const buttonDrive = document.getElementById("buttonDrive")
const buttonProfile = document.getElementById("buttonProfile")
const divDataProfile = document.getElementById("divDataProfile")
const currentPassword = document.getElementById("currentPassword")
const newPassword = document.getElementById("newPassword")
const updateUserPassword = document.getElementById("updateUserPassword")
const messagePasswordChange = document.getElementById("messagePasswordChange")
const loggedOutModal = document.getElementById("loggedOutModal")
const loggedOutDiv = document.getElementById("loggedOutDiv")
const deleteAccountModal = document.getElementById("deleteAccountModal")
const deleteDiv = document.getElementById("deleteDiv")

const users = localStorage.getItem("user")
usersParsed = JSON.parse(users)

buttonDrive.addEventListener("click", () => {
    window.location.href = "home.html"
})


buttonProfile.addEventListener("click", () => {
    window.location.href = "profile.html"
})


window.addEventListener("load", () => {
    const h1Name  = document.createElement("h1")
    const h1Email = document.createElement("h1")
    h1Name.innerHTML = usersParsed.name
    h1Email.innerHTML = usersParsed.email

    divDataProfile.appendChild(h1Name)
    divDataProfile.appendChild(h1Email)
   

})

updateUserPassword.addEventListener("click", async () => {
    const messagePasswordChangeTest = document.createElement("h2")

if (newPassword.value === "") {
    messagePasswordChange.innerHTML = ""
    messagePasswordChangeTest.innerHTML = "new password cannot be blanked"
    messagePasswordChange.appendChild(messagePasswordChangeTest)
} else {
        const response = await fetch(`http://server:3000/updateUser`, {
        method: "put",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: window.user.ID,
            password: currentPassword.value,
            newPassword: newPassword.value
        })

    })
    const json = await response.json()
    
    if (json.message) {
        messagePasswordChange.innerHTML = ""
        messagePasswordChangeTest.innerHTML = json.message
        messagePasswordChange.appendChild(messagePasswordChangeTest)
    } else if (json.error) {
        
        messagePasswordChange.innerHTML = ""
        messagePasswordChangeTest.innerHTML = json.error
        messagePasswordChange.appendChild(messagePasswordChangeTest)
    }
}
})
   

loggedOutModal.addEventListener("click", () => {

    const modalLoggedOut = document.createElement("div")
    modalLoggedOut.id = "modalLoggedOut"

    const loggedOutMessage = document.createElement("h3")
    loggedOutMessage.textContent = "Are you sure that you want to logout !"
    loggedOutMessage.id = "loggedOutMessage"

    const buttonLoggedOut = document.createElement("button")
    buttonLoggedOut.textContent = "Logged out"
    buttonLoggedOut.id = "buttonLoggedOut"
    
    const buttonGoBack = document.createElement("button")
    buttonGoBack.textContent = "Go Back"
    buttonGoBack.id = "goBack"
    
    loggedOutDiv.appendChild(modalLoggedOut)
    modalLoggedOut.appendChild(loggedOutMessage)
    modalLoggedOut.appendChild(buttonLoggedOut)
    modalLoggedOut.appendChild(buttonGoBack)

buttonLoggedOut.addEventListener("click", () => {
    
            const data = {
                loggedIn: false
            }
    
            let storage = JSON.stringify(data)
    
            localStorage.setItem("user", storage)
    
    
            window.location.href = "index.html"
})


    buttonGoBack.addEventListener("click", () => {
        modalLoggedOut.style.display = "none"

    })
})

deleteAccountModal.addEventListener("click", () => {
    const modaldeleteAccount = document.createElement("div")
    modaldeleteAccount.id = "modalDeleteAccount"

    const deleteAccountMessage = document.createElement("h3")
    deleteAccountMessage.textContent = "Are you sure that you want to delete the account !"
    deleteAccountMessage.id = "deleteAccountMessage"

    const buttondeleteAccount = document.createElement("button")
    buttondeleteAccount.textContent = "Delete account"
    buttondeleteAccount.id = "buttonDeleteAccount"
    
    const buttonGoBack = document.createElement("button")
    buttonGoBack.textContent = "Go Back"
    buttonGoBack.id = "goBack"
    
    deleteDiv.appendChild(modaldeleteAccount)
    modaldeleteAccount.appendChild(deleteAccountMessage)
    modaldeleteAccount.appendChild(buttondeleteAccount)
    modaldeleteAccount.appendChild(buttonGoBack)

    buttondeleteAccount.addEventListener("click", async () => {
        const response = await fetch(`http://server:3000/deleteUser/${window.user.ID}`, {
            method: "delete",
             headers: {
            'Content-Type': 'application/json',
            },
        })

        const json = response.json()

        const data = {
            loggedIn: false
        }

        let storage = JSON.stringify(data)

        localStorage.setItem("user", storage)
        window.location.href = "index.html"
        
    })

    buttonGoBack.addEventListener("click",   () => {
        modaldeleteAccount.style.display = "none"
        
    })
})

