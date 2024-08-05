const img = document.getElementById('homeimg')

window.electronAPI.onReceiveURL((value)=>{
img.src=value
window.electronAPI.closeindow()
})