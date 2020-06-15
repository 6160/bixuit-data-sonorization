// constants
const MINWIDTH = 480;
const UI = {};

// other stuff
let START = false;
let glados;
let song;
let graph;
let amp;
let button;
let sampleNo = 0;
let volhistory = [];
let bgimg;
let ismobile = false;
let SCENE;
let vol;

function toggleSong() {
    if (song.isPlaying()) {
        song.pause();
    } else {
        song.play();
    }
}

function preload() {
    console.log(' #### loading assets.')
    glados = loadSound('./audio/glados_test.mp3');
    song = loadSound('./audio/song.mp3');
    graph = loadSound('./audio/graph.mp3');
}

function startMid() {
    const terminal = document.getElementsByClassName("terminal")[0];
    terminal.style.display = 'none';
    SCENE = mid;
    setMidPositions();
    amp = new p5.Amplitude();
    amp.setInput(graph);
    graph.play();
    console.log('starting gruhigieghrieughrieu')
    
}


function setIntroPositions() {
    if (width <= MINWIDTH) {
        ismobile = true;
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


function setMidPositions() {
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
        x: width / 2,
        y: height/2,
    };

    UI.volstring = {
        x: (width / 2)  + 100,
        y: (height / 2) + 75,
    }

    UI.sampleNo = {
        x: (width / 2) - 100,
        y: (height / 2) - 75,
    }
}

function setEndPositions() {

}


window.addEventListener("message", function (e) {
    if (e.data === 'START') {
        console.log(' #### STARTING P5')
        START = true;
        glados.play();
        glados.onended(startMid);
        song.play();
        document.getElementById('welcome-message').style.visibility = 'hidden';
    }
}, false);


function intro() {
    drawUI();
    vol = amp.getLevel();
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


function mid() {
    vol = amp.getLevel();
    ellipse(UI.ellipse.x, UI.ellipse.y, 200, vol * 200);
    textFont('monospace');
    textSize(8);

    let volstring = vol.toString()
    text(volstring.substring(0, 4), UI.volstring.x, UI.volstring.y);
    text(sampleNo, UI.sampleNo.x, UI.sampleNo.y);
}

function end() {

}



function setup() {
    document.getElementById('welcome-message').style.visibility = 'visible';
    // document.getElementById('p5_loading').style.visibility = 'hidden';
    console.log(' #### loading variables.')
    console.log(' #### > dpr ', window.devicePixelRatio)
    console.log(' #### > dim ', window.innerWidth, window.innerHeight)
    
    pixelDensity(window.devicePixelRatio)
    let c = createCanvas(window.innerWidth, window.innerHeight);
    c.parent("p5canvas");

    amp = new p5.Amplitude();
    amp.setInput(glados);
    setIntroPositions();    
    SCENE = intro;
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

    stroke('rgba(0, 162, 255,1)');
    line(UI.graphUI.indicator.end, UI.graphUI.line.y.bottom, width - UI.paddingGraphLine, UI.graphUI.line.y.bottom)
    line(UI.graphUI.indicator.end, UI.graphUI.line.y.mid, width - UI.paddingGraphLine, UI.graphUI.line.y.mid)
    line(UI.graphUI.indicator.end, UI.graphUI.line.y.high, width - UI.paddingGraphLine, UI.graphUI.line.y.high)
}


function draw() {
    if (!START) return;
    clear();
    // text(`width: ${width} / ismobile: ${ismobile}`, 10, 10)
    SCENE();
}