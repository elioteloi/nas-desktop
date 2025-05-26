const userEmail = document.getElementById("emailLogin")
const userPassword = document.getElementById("passwordLogin")
const errorLogIn = document.getElementById("errorLogIn")
const button = document.getElementById("signin")
const buttonGoToLogin = document.getElementById("go-to-sigin")

button.addEventListener('click', () => {
console.log(userEmail.value);
console.log(userPassword.value);

login(userEmail.value, userPassword.value)

  console.log("click");

})


async function login(email, password) {
    const response = await fetch(`http://${window.env.API_KEY}:3000/fetchUser`, {
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
    console.log(json);
    
    if (json.success) {
        window.location.href = "/pages/home.html"
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
