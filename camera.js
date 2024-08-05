const video = document.getElementById("camera");
const camStatus = document.getElementById("camera-status");
const captureImgBtn = document.getElementById("capture-btn");
const Image = document.getElementById("image");

captureImgBtn.addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2D").drawImage(video, 0, 0, canvas.width, canvas.width);
  const dataURL = canvas.toDataURL();
  Image.src = dataURL;
  window.electronAPI.sendURL(dataURL);
  new Notification("Image captured", {
    body: "Image successfully captured from live video!",
    timeoutType: "never",
    silent: "false",
    urgency: "normal",
  });
});

navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  console.log(stream);
  video.srcObject = stream;
  if ((stream == null) | undefined) {
    camStatus.innerText = "An error occured accessing the camera";
  }
});
