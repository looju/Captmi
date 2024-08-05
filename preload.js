const { contextBridge, ipcRenderer } = require('electron/renderer');

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});

contextBridge.exposeInMainWorld('electronAPI',{
    sendURL:(url)=>ipcRenderer.send('sendURL',url),
    onReceiveURL:()=>ipcRenderer.on('receivedURL',(_event, value) => callback(value)),
    sendCloseWindow:()=>ipcRenderer.send('quitWindow')
})
