
var song;
var amp;
var button;
let sampleNo = 0;
var volhistory = [];

function toggleSong() {
    if (song.isPlaying()) {
        song.pause();
    } else {
        song.play();
    }
}

function preload() {
    song = loadSound('GLADOS.mp3');
}

function setup() {
    console.log(window.innerHeight, window.innerWidth)
    let c = createCanvas(window.innerWidth, window.innerHeight);
    c.parent("p5canvas");
    // button = createButton('toggle');
    // button.mousePressed(toggleSong);
    song.play();
    amp = new p5.Amplitude();
}


function drawUI() {

    const lineL = 25;
    const lineR = 30;
    // graph
    // stroke(255,0,0);
    // line(10,  height - 25, 10, 650)
    textFont('Monospace');
    textSize(8);
    line(lineL, height - 25, lineR, height - 25)
    line(lineL, height - 100, lineR, height - 100)
    line(lineL, height - 175, lineR, height - 175)

    text('0.0',lineL - 16, height - 25)
    text('0.5',lineL - 16, height - 100)
    text('1.0',lineL - 16, height - 175)


    stroke('rgba(255,255,255,0.15)');
    line(lineR, height - 25, width - 25, height - 25)
    line(lineR, height - 100, width - 25, height - 100)
    line(lineR, height - 175, width - 25, height - 175)

}



function draw() {
    background(0);
    drawUI();
    
    var vol = amp.getLevel();
    volhistory.push(vol);
    sampleNo+=1;
    stroke(255);
    noFill();
    push();
    var currentY = map(vol, 0, 1, height - 25, 100);
    // translate(0, height / 2 - currentY);
    beginShape();
    for (var i = 0; i < volhistory.length; i++) {
        var y = map(volhistory[i], 0, 1, height - 25, height - 500);
        vertex(i + 35, y);
    }
    endShape();
    pop();
    if (volhistory.length > width - 50) {
        volhistory.splice(0, 1);
    }

    // stroke(255, 0, 0);
    // line(volhistory.length, 0, volhistory.length, height);
    ellipse(125, 125, 200, vol * 200);
    textFont('monospace');
    textSize(8);
    textStyle('LIGHT')
    let volstring = vol.toString()
    text(volstring.substring(0,4), 220, 200);
    text(sampleNo, 20, 60)
}