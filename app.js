try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
}

var noteContent = '';
var instructions = $('#recording-instructions');
var noteTextarea = $('#note-textarea');
var command = "";
var cmdArr = []

recognition.continuous = true;
//onYouTubeIframeAPIReady();

recognition.onresult = function(event) {

  console.log(recognition)

  var current = event.resultIndex;

  var transcript = event.results[current][0].transcript;

  var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

  if(!mobileRepeatBug) {
    noteContent += transcript;
    noteTextarea.val(noteContent);
  }

  command = transcript;
  cmdArr = command.split(" ");
  //console.log(transcript);
  //console.log(cmdArr);


  noteTextarea.text(transcript);
  if (transcript.search("play") == 1 || transcript.search("play") == 0) {
    console.log("PLaying..")
    document.getElementById('play').click();

  }

  if (transcript.search("pause") == 1 || transcript.search("pause") == 0) {
    console.log("Pausing..")
    document.getElementById('pause').click();

  }

  if (transcript.indexOf("mute") != -1 ) {
    console.log("Muting..")
    document.getElementById('mute-toggle').click();

  }

  if (transcript.indexOf("volume up") != -1 ||  transcript.indexOf("increase volume") != -1 || transcript.indexOf("up") != -1) {
    console.log("Volume up..")
    document.getElementById('volume-input-up').click();

  }

  if (transcript.indexOf("volume down") != -1 ||  transcript.indexOf("decrease volume") != -1 || transcript.indexOf("down") != -1 ) {
    console.log("Volume down..")
    document.getElementById('volume-input-down').click();

  }

};

recognition.onend = function() {
  console.log("disconnected");
}

recognition.onsoundstart = function() {
  console.log("listening");
}

recognition.onsoundend = function() {
  console.log("not listening");
}


recognition.onspeechend = function() {
  console.log("speech end");
}

recognition.onstart = function() {
  instructions.text('Voice recognition activated. Try speaking into the microphone.');

}

recognition.onspeechend = function() {
  instructions.text('You were quiet for a while so voice recognition turned itself off.');
}

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.text('No speech was detected. Try again.');
  };
}

// function refresh(){
//     console.log('Refresh...')
//     recognition.stop();
//     console.log('Voice recognition paused.');
//     recognition.start();
// }
//
// setInterval(function(){
//   refresh()
// }, 30000)



$('#start-btn').on('click', function(e) {

  if (noteContent.length) {
    noteContent += ' ';
  }
  recognition.start();
});

// Sync the text inside the text area with the noteContent variable.
noteTextarea.on('input', function() {
  noteContent = $(this).val();
})

$('#pause-btn').on('click', function(e) {
  recognition.stop();
  console.log('Voice recognition paused.');
});
