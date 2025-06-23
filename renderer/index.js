const userName = document.getElementById("name")
const userEmail = document.getElementById("email")
const userPassword = document.getElementById("password")
const button = document.getElementById("signin")
const errorSignIn = document.getElementById("errorSignIn")
const buttonGoToLogin = document.getElementById("go-to-login")

button.addEventListener('click', () => {

  signin(userName.value, userEmail.value, userPassword.value)

})



async function signin(name, email, password) {
    const response = await fetch(`http://server:3000/createUser`, {
        method: 'post',
          headers: {
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({
          name,
          email,
          password
      })
    })
    const json = await response.json()

    if (json.success) {
      window.location.href = "home.html"
    } else if (json.errorEmail) {
      errorSignIn.innerHTML = json.errorEmail
      
    } else if(json.errorInput) {
      errorSignIn.innerHTML = json.errorInput
    }
    
}

buttonGoToLogin.addEventListener("click", () => {
  window.location.href = "login.html"

})