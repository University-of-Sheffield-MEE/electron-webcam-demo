const state = {
  imageCapture: null,
  outputPath: null,
  fileNumber: 0,
  devices: [],
}

const elements = {
  select: document.getElementById("devices"),
  video: document.getElementById("video"),
  outputPath: document.getElementById("output-path"),
  selectOutputPath: document.getElementById("select-output-path"),
  captureImage: document.getElementById("capture-image"),
  outputContainer: document.getElementById('output-container'),
  videoContainer: document.getElementById('video-container'),
  captureContainer: document.getElementById('capture-container'),
}

updateDevices();
startWebcam();

async function updateDevices () {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const webcams = devices.filter(d => d.kind === 'videoinput');

  state.devices = webcams;

  elements.select.innerHTML = '';
  webcams.forEach(webcam => {
    const option = document.createElement('option');
    option.value = webcam.deviceId;
    option.text = webcam.label;
    elements.select.appendChild(option);
  });
  elements.select.addEventListener('change', e => {
    startWebcam(e.target.value);
  });
  render();
}

async function startWebcam (id=null) {
  const constraints = {
    audio: false,
    video: { deviceId: id, width: 1920, height: 1080 }
  };
  const video = await navigator.mediaDevices.getUserMedia(constraints);
  elements.video.srcObject = video;

  const track = video.getVideoTracks()[0];
  state.imageCapture = new ImageCapture(track);
  render();
}

async function selectDirectory () {
  state.outputPath = await window.electron.selectDirectory();
  elements.outputPath.innerHTML = state.outputPath;
  render();
}

async function saveImage () {
  const blob = await state.imageCapture.takePhoto({ imageHeight: 1080, imageWidth: 1920 });
  const buffer = await blob.arrayBuffer();
  const data = new Uint8Array(buffer);
  const path = state.outputPath + `\\${state.fileNumber.toString().padStart(4, '0')}.jpg`;
  window.electron.saveFile(path, data);
  state.fileNumber++;
}

function render () {
  if (state.outputPath) {
    elements.outputContainer.style.display = 'inherit';
    elements.videoContainer.style.display = 'inherit';
    elements.captureContainer.style.display = 'inherit';
  } else {
    elements.videoContainer.style.display = 'none';
    elements.captureContainer.style.display = 'none';
  }
}

elements.selectOutputPath.addEventListener('click', selectDirectory)
elements.captureImage.addEventListener('click', saveImage)
render()