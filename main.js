status = ""
hint = ""
objects = ""
synth = window.speechSynthesis;

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocssd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    hint = document.getElementById("input").value;
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}

function draw(){
    image(video, 0, 0, 380, 380);
    if(status !=""){
        objectDetector.detect(video, gotResult);
        for(i=0; i <objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            
            fill("#FF0000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label = hint){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML = "Object metioned is found"
                speech = new SpeechSynthesisUtterance('Object metioned is found');
                window.speechSynthesis.speak(speech);

            }else{
                document.getElementById("object_status").innerHTML = "Object metioned is not found"
                speech = SpeechSynthesisUtterance('Object metioned is not found');
                window.speechSynthesis.speak(speech);
            }
        }
      }
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results
}
