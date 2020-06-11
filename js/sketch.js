// constants
const MINWIDTH = 400;
const UI = {};

// other stuff
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
}

function assignPositions() {
    if (width < MINWIDTH) {
        // mobile
        UI.graphStartX = 5;
        UI.graphUI = {};
        UI.graphUI.indicator = {
            start: 25 + UI.graphStartX,
            end: 30 + UI.graphStartX,
        };

        UI.graphUI.line = {
            x: UI.graphUI.indicator.end + 10,
            y: {
                bottom: height - 25,
                mid: height - 100,
                high: height - 175,
            }
        };

        UI.paddingGraphLine = 25;
        UI.paddingGraphText = 16
        UI.ellipse = {
            x: width/2,
            y: height - 175 - 100,
        };

        UI.volstring = {
            x: 12,
            y: UI.ellipse.y - 50,
        }

        UI.sampleNo = {
            x: width - 20,
            y: UI.ellipse.y + 50,
        }
    } else {
        // desktop
        UI.graphStartX = 230;
        UI.graphUI = {};
        UI.graphUI.indicator = {
            start: 25 + UI.graphStartX,
            end: 30 + UI.graphStartX,
        };

        UI.graphUI.line = {
            x: UI.graphUI.indicator.end + 10,
            y: {
                bottom: height - 25,
                mid: height - 100,
                high: height - 175,
            }
        };

        UI.paddingGraphLine = 25;
        UI.paddingGraphText = 16
        UI.ellipse = {
            x: 125,
            y: height - 100,
        };

        UI.volstring = {
            x: 20,
            y: height - 25,
        }

        UI.sampleNo = {
            x: 20,
            y: height - 175,
        }
    }
}


function setup() {
    console.log(' #### loading variables.')
    console.log(' #### > dpr ', window.devicePixelRatio)
    pixelDensity(window.devicePixelRatio)
    console.log(' #### > dim ', window.innerWidth, window.innerHeight)

    let c = createCanvas(window.innerWidth, window.innerHeight);
    c.parent("p5canvas");

    // button = createButton('toggle');
    // button.mousePressed(toggleSong);

    song.play();
    amp = new p5.Amplitude();
    assignPositions();
    console.log(' #### sending start message.')
    window.postMessage('START', '*');
    
}

function drawUI() {
    textFont('Monospace');
    textSize(8);
    line(UI.graphUI.indicator.start, UI.graphUI.line.y.bottom, UI.graphUI.indicator.end, UI.graphUI.line.y.bottom)
    line(UI.graphUI.indicator.start, UI.graphUI.line.y.mid, UI.graphUI.indicator.end, UI.graphUI.line.y.mid)
    line(UI.graphUI.indicator.start, UI.graphUI.line.y.high, UI.graphUI.indicator.end, UI.graphUI.line.y.high)

    text('0.0', UI.graphUI.indicator.start - UI.paddingGraphText, UI.graphUI.line.y.bottom)
    text('0.5', UI.graphUI.indicator.start - UI.paddingGraphText, UI.graphUI.line.y.mid)
    text('1.0', UI.graphUI.indicator.start - UI.paddingGraphText, UI.graphUI.line.y.high)

    stroke('rgba(255,255,255,0.2)');
    line(UI.graphUI.indicator.end, UI.graphUI.line.y.bottom, width - UI.paddingGraphLine, UI.graphUI.line.y.bottom)
    line(UI.graphUI.indicator.end, UI.graphUI.line.y.mid, width - UI.paddingGraphLine, UI.graphUI.line.y.mid)
    line(UI.graphUI.indicator.end, UI.graphUI.line.y.high, width - UI.paddingGraphLine, UI.graphUI.line.y.high)
}



function draw() {
    clear();
    text(`width: ${width}`, 10, 10)
    // background(37,50,104);
    // image(bgimg, 0, 0, width, height)
    drawUI();

    var vol = amp.getLevel();
    volhistory.push(vol);
    sampleNo += 1;
    stroke(255);
    noFill();
    push();

    beginShape();
    for (var i = 0; i < volhistory.length; i++) {
        var y = map(volhistory[i], 0, 1, height - 25, height - 500);
        vertex((i * 4) + UI.graphUI.line.x, y);
    }
    endShape();
    pop();

    if (volhistory.length * 4 > (width) - 50 - UI.graphUI.line.x) {
        volhistory = [];
    }

    ellipse(UI.ellipse.x, UI.ellipse.y, 200, vol * 200);
    textFont('monospace');
    textSize(8);

    let volstring = vol.toString()
    text(volstring.substring(0, 4), UI.volstring.x, UI.volstring.y);
    text(sampleNo, UI.sampleNo.x, UI.sampleNo.y);
}