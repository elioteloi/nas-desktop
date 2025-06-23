const userEmail = document.getElementById("emailLogin")
const userPassword = document.getElementById("passwordLogin")
const errorLogIn = document.getElementById("errorLogIn")
const button = document.getElementById("signin")
const buttonGoToLogin = document.getElementById("go-to-sigin")

button.addEventListener('click', () => {


login(userEmail.value, userPassword.value)

})


async function login(email, password) {
    const response = await fetch(`http://server:3000/fetchUser`, {
        method: "post",
        headers: {
             'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password
        })
    })

    const json = await response.json()

    if (json.success) {
        
        const data = {
            loggedIn: true,
            id: json.id,
            name: json.name,
            email: json.email
        }

        let storage = JSON.stringify(data)

        localStorage.setItem("user", storage)

        window.location.href = "home.html"

    } else if (json.errorInput) {
        errorLogIn.innerHTML = json.errorInput

    } else if(json.errorEmail) {
        errorLogIn.innerHTML = json.errorEmail

    } else {
        errorLogIn.innerHTML = json.errorPassword
    }
}


buttonGoToLogin.addEventListener("click", () => {
    window.location.href = "index.html"
})
