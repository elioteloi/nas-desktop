const { contextBridge, ipcRenderer } = require('electron');

const user = localStorage.getItem("user")
const userParse = JSON.parse(user)


contextBridge.exposeInMainWorld('user', {
  ID: userParse.id,
  NAME: userParse.name,
  EMAIL: userParse.email,
  LOGGEDIN: userParse.loggedIn
})


