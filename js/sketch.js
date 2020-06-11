const graphX = 230;
const lineL = 25 + graphX;
const lineR = 30 + graphX;
const graphLineX = lineR + 10;
const graphLineY = {}
const paddingGraphText = 16;
const paddingGraphLine = 25;

let song;
let amp;
let button;
let sampleNo = 0;
let volhistory = [];
let bgimg;

function toggleSong() {
    if (song.isPlaying()) {
        song.pause();
    } else {
        song.play();
    }
}

function preload() {
    console.log(' #### loading assets.')
    song = loadSound('./audio/GLADOS.mp3');
    // bgimg = loadImage('./img/bg.png');
}

function setup() {
    console.log(' #### loading variables.')
    console.log(' #### > dpr ',window.devicePixelRatio)
    pixelDensity(window.devicePixelRatio)
    console.log(' #### > dim ', window.innerWidth, window.innerHeight)
    
    let c = createCanvas(window.innerWidth, window.innerHeight);
    c.parent("p5canvas");
    
    // button = createButton('toggle');
    // button.mousePressed(toggleSong);
    
    song.play();
    amp = new p5.Amplitude();
    graphLineY.bottom = height - 25;
    graphLineY.mid = height - 100;
    graphLineY.high = height - 175;
    console.log(' #### sending start message.')
    window.postMessage('START', '*');
}

function drawUI() {
    textFont('Monospace');
    textSize(8);
    line(lineL, graphLineY.bottom, lineR, graphLineY.bottom)
    line(lineL, graphLineY.mid, lineR, graphLineY.mid)
    line(lineL, graphLineY.high, lineR, graphLineY.high)

    text('0.0',lineL - paddingGraphText, graphLineY.bottom)
    text('0.5',lineL - paddingGraphText, graphLineY.mid)
    text('1.0',lineL - paddingGraphText, graphLineY.high)

    stroke('rgba(255,255,255,0.2)');
    line(lineR, graphLineY.bottom, width - paddingGraphLine, graphLineY.bottom)
    line(lineR, graphLineY.mid, width - paddingGraphLine, graphLineY.mid)
    line(lineR, graphLineY.high, width - paddingGraphLine, graphLineY.high)
}

function bgTile() {
    const tile = 50;
    const x_tile = width / tile;
    const y_tile = height / tile;
    
    stroke('rgba(255,255,255,0.01)');
    noFill();
    for (let i = 0; i < x_tile; i ++) {

        for (let j = 0; j < y_tile; j ++) {
            square(i * tile, j * tile, tile);
        }
    }
}

function draw() {
    clear();
    // background(37,50,104);
    // image(bgimg, 0, 0, width, height)
    drawUI();
    
    var vol = amp.getLevel();
    volhistory.push(vol);
    sampleNo+=1;
    stroke(255);
    noFill();
    push();

    beginShape();
    for (var i = 0; i < volhistory.length; i++) {
        var y = map(volhistory[i], 0, 1, height - 25, height - 500);
        vertex((i*4)+ graphLineX, y);
    }
    endShape();
    pop();

    if (volhistory.length * 4 > (width) - 50 - graphLineX) {
        volhistory = [];
    }

    ellipse(125, height - 100, 200, vol * 200);
    textFont('monospace');
    textSize(8);
    let volstring = vol.toString()
    text(volstring.substring(0,4), 20, height - 25);
    text(sampleNo, 20, height - 175)
}