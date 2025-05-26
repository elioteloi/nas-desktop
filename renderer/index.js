const userName = document.getElementById("name")
const userEmail = document.getElementById("email")
const userPassword = document.getElementById("password")
const button = document.getElementById("signin")
const errorSignIn = document.getElementById("errorSignIn")
const buttonGoToLogin = document.getElementById("go-to-login")

button.addEventListener('click', () => {
  console.log(userName.value);
  console.log(userEmail.value);
  console.log(userPassword.value);

  signin(userName.value, userEmail.value, userPassword.value)

  console.log("click");

})



async function signin(name, email, password) {
    const response = await fetch(`http://${window.env.API_KEY}:3000/createUser`, {
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
    console.log("response", json);

    if (json.success) {
      console.log("true");
      window.location.href = "home.html"
    } else if (json.errorEmail) {
      errorSignIn.innerHTML = json.errorEmail
      console.log(json.errorEmail);
      
    } else if(json.errorInput) {
      errorSignIn.innerHTML = json.errorInput
    }
    
}

buttonGoToLogin.addEventListener("click", () => {
  console.log("click login");
  window.location.href = "login.html"

})