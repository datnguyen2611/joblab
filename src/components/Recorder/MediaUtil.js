export function captureUserMedia(callback) {
  var params = { audio: true, video: true };

  navigator.mediaDevices.getUserMedia(params, callback, (error) => {
    alert("get user media failed");
  });
};

export function stopCaptureUserMedia(stream) {
  if(stream != null) {
    console.log("stop stream");
    stream.getTracks().forEach(function(track) {
          console.log("stop live stream");
            track.stop();
    });
  }
    
}