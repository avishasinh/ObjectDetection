var status = ""
var objects = []

function preload(){
    pic = loadImage("fruits.jpg")
}

function setup(){
    canvas = createCanvas(600, 600)
    canvas.center()
    model = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "Detecting Objects..."
}

function draw(){
    image(pic, 0, 0, 600, 600)

    for(var i = 0; i < objects.length; i++){
        label = objects[i].label.toUpperCase()
        x = objects[i].x
        y = objects[i].y
        width = objects[i].width
        height = objects[i].height
        confidence = Math.floor(objects[i].confidence*100)

        stroke("red")
        noFill()
        rect(x, y, width, height)
        fill("red")
        text(label + " " + confidence + "%", x + 15, y + 15)

        document.getElementById("numbers").innerHTML = "There are 3 big objects in this image and the cocossd model has identified 3 of those images"
    }
}

function modelLoaded(){
    console.log("Model Loaded")
    model.detect(pic, gotResults)
}

function gotResults(error, results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results)
        objects = results
        document.getElementById("status").innerHTML = "Objects Detected"
    }
}