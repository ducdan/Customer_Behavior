showInfo('info_start');


var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  start_button.style.display = 'inline-block';
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function() {
    recognizing = true;
    showInfo('info_speak_now');
    start_img.src = '../vendors/images/mic-animate.gif';
  };

  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      start_img.src = '../vendors/images/mic.gif';
      showInfo('info_no_speech');
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      start_img.src = '../vendors/images/mic.gif';
      showInfo('info_no_microphone');
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        showInfo('info_blocked');
      } else {
        showInfo('info_denied');
      }
      ignore_onend = true;
    }
  };

  recognition.onend = function() {
    recognizing = false;
    if (ignore_onend) {
      return;
    }
    start_img.src = '../vendors/images/mic.gif';
    if (!final_transcript) {
      showInfo('info_start');
      return;
    }
    showInfo('');
    recognition.start();
  };

  recognition.onresult = function(event) {
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = capitalize(final_transcript);
    updateResult(final_transcript)
  };
}
function updateResult(transcript) {
    var lower_transcript = transcript.toLowerCase();
    console.log(lower_transcript);

    if(lower_transcript.indexOf("submit")!=-1){
        $("#submit").click();
    }

    if(lower_transcript.indexOf("cancel")!=-1){
        $("#cancel").click();
    }
    if(lower_transcript.indexOf("reset")!=-1){
        $("#reset").click();
    }
    if(lower_transcript.indexOf("tenure")!=-1){
        $("#tenure").focus();
        var content = lower_transcript.split("tenure").pop().split(" ").slice(0,4);
        for (var i=0;i<content.length;i++){
            var word =content[i];
            if(!isNaN(parseInt(word))){
                $("#tenure").val(content);
                break;
            }
        }
    }

    if(lower_transcript.indexOf("multiple line")!=-1 || lower_transcript.indexOf("multiple lines")!=-1){
        $("#multiple_line").focus();
        var content = lower_transcript.split("multiple line").pop().split(" ").slice(0,4);
        for (var i=0;i<content.length;i++){
            var word = content[i];
            if(word.indexOf("yes")!=-1){
                $("#multiple_line").val("Yes");
                break;
            }
            else if(word.indexOf("service")!=-1){
                $("#multiple_line").val("No phone service");
                break;
            }
            else if (word.indexOf("no")){
                $("#multiple_line").val("No");
            }
        }
    }

     if(lower_transcript.indexOf("internet service")!=-1){
        $("#internet_service").focus();
        var content = lower_transcript.split("internet service").pop().split(" ").slice(0,4);
        for (var i=0;i<content.length;i++){
            var word = content[i];
            if(word.indexOf("fiber")!=-1){
                $("#internet_service").val("Fiber optic");
                break;
            }
            else if(word.indexOf("no")!=-1){
                $("#internet_service").val("No");
                break;
            }
            else{
                $("#internet_service").val("DSL");
            }
        }
    }

    if(lower_transcript.indexOf("tv")!=-1){
         $("#streaming_tv").focus();
        var content = lower_transcript.split("tv").pop().split(" ").slice(0,4);
        for (var i=0;i<content.length;i++){
            var word = content[i];
            if(word.indexOf("yes")!=-1){
                $("#streaming_tv").val("Yes");
                break;
            }
            else if(word.indexOf("service")!=-1){
                $("#streaming_tv").val("No internet service");
                break;
            }
            else if (word.indexOf("no")){
                $("#streaming_tv").val("No");
            }
        }
    }

     if(lower_transcript.indexOf("movie")!=-1){
        $("#streaming_movies").focus();
        var content = lower_transcript.split("movie").pop().split(" ").slice(0,4);
        for (var i=0;i<content.length;i++){
            var word = content[i];
            if(word.indexOf("yes")!=-1){
                $("#streaming_movies").val("Yes");
                break;
            }
            else if(word.indexOf("service")!=-1){
                $("#streaming_movies").val("No internet service");
                break;
            }
            else if (word.indexOf("no")){
                $("#streaming_movies").val("No");
            }
        }
    }

     if(lower_transcript.indexOf("contract")!=-1){
         $("#contract").focus();
        var content = lower_transcript.split("contract").pop().split(" ").slice(0,4);
        for (var i=0;i<content.length;i++){
            var word = content[i];
            if(word.indexOf("month")!=-1){
                $("#contract").val("Month-to-month");
                break;
            }
            else if(word.indexOf("one")!=-1 || word.indexOf("1")!=-1){
                $("#contract").val("One year");
                break;
            }
            else if (word.indexOf("two")||word.indexOf("2")!=-1){
                $("#contract").val("Two year");
            }
        }
    }

    if(lower_transcript.indexOf("paperless billing")!=-1){
         $("#paperless_billing").focus();
         var content = lower_transcript.split("bill").pop().split(" ").slice(0,4);
        for (var i=0;i<content.length;i++){
            var word = content[i];
            if(word.indexOf("yes")!=-1){
                $("#paperless_billing").val("Yes");
                break;
            }
            else if(word.indexOf("no")!=-1){
                $("#paperless_billing").val("No");
                break;
            }
        }
    }

    if(lower_transcript.indexOf("payment method")!=-1){
        $("#payment_method").focus();
        var content = lower_transcript.split("payment").pop().split(" ").slice(0,8);
        for (var i=0;i<content.length;i++){
            var word = content[i];
            if(word.indexOf("electronic")!=-1){
                $("#payment_method").val("Electronic check");
                break;
            }
            else if(word.indexOf("mail")!=-1){
                $("#payment_method").val("Mailed check");
                break;
            }
            else if(word.indexOf("bank")!=-1){
                $("#payment_method").val("Bank tranfer (automatic)");
                break;
            }
            else if(word.indexOf("credit")!=-1){
                $("#payment_method").val("Credit card (automatic)");
                break;
            }
        }
    }

    if(lower_transcript.indexOf("monthly charges")!=-1 || lower_transcript.indexOf("monthly charge")!=-1){
        $("#monthly_charge").focus();
     var content = lower_transcript.split("monthly charge").pop().split(" ").slice(0,4);
        for (var i=0;i<content.length;i++){
            var word =content[i];
            if(!isNaN(parseInt(word))){
                $("monthly_charge").val(content);
                break;
            }
        }
    }
}
function upgrade() {
  start_button.style.visibility = 'hidden';
  showInfo('info_upgrade');
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}


function startButton(event) {
  if (recognizing) {
    recognition.stop();
    return;
  }
  final_transcript = '';
  recognition.lang = ['en-US', 'United States'];
  recognition.start();
  ignore_onend = false;
  start_img.src = '../vendors/images/mic-slash.gif';
  showInfo('info_allow');
  start_timestamp = event.timeStamp;
}

function showInfo(s) {
  if (s) {
    for (var child = info.firstChild; child; child = child.nextSibling) {
      if (child.style) {
        child.style.display = child.id == s ? 'inline' : 'none';
      }
    }
    info.style.visibility = 'visible';
  } else {
    info.style.visibility = 'hidden';
  }
}
