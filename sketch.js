
var song;
var amp;
var button;
let sampleNo = 0;
var volhistory = [];

const graphX = 230;
const lineL = 25 + graphX;
const lineR = 30 + graphX;
const graphLineX = lineR + 10;

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
    console.log('dpr ',window.devicePixelRatio)
    pixelDensity(window.devicePixelRatio)
    console.log(window.innerHeight, window.innerWidth)
    let c = createCanvas(window.innerWidth, window.innerHeight);
    c.parent("p5canvas");
    // button = createButton('toggle');
    // button.mousePressed(toggleSong);
    song.play();
    amp = new p5.Amplitude();
}


function drawUI() {

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

function bgTile() {
    const tile = 50;
    const x_tile = width / 50;
    const y_tile = height / 50;
    stroke('rgba(255,255,255,0.05)');
    noFill();
    for (let i = 0; i < x_tile; i ++) {

        for (let j = 0; j < y_tile; j ++) {
            console.log(Math.floor(frameCount % y_tile))
            if (Math.floor(frameCount % y_tile) === i) fill(0,0,255);
            else noFill();
            square(j * tile, i * tile, tile);
        }
    }
}


function draw() {
    background(0);
    drawUI();
    // bgTile();
    
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
        vertex(i + graphLineX, y);
    }
    endShape();
    pop();
    if (volhistory.length > width - 50 - graphLineX) {
        // volhistory.splice(0, 1);
        volhistory = [];
    }

    // stroke(255, 0, 0);
    // line(volhistory.length, 0, volhistory.length, height);
    ellipse(125, height - 100, 200, vol * 200);
    textFont('monospace');
    textSize(8);
    // textStyle('LIGHT')
    let volstring = vol.toString()
    text(volstring.substring(0,4), 20, height - 25);
    text(sampleNo, 20, height - 175)
}