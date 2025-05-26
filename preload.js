const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('env', {
  API_KEY: process.env.API_IP_ADDRESS,
});
