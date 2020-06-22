// constants
const MINWIDTH = 480;
const UI = {};
const AUDIO = {};
const graphData = {
    2010: {
        label: '',
        color: 'rgb(214, 169, 75)',
        points: [],
        seed: 2,
    },
    2011: {
        label: '',
        color: 'rgb(66, 130, 247)',//'rgb(11, 30, 99)',//,
        points: [],
        seed: 13,
    },
    2012: {
        label: '',
        color: 'rgb(243, 5, 2)',
        points: [],
        seed: 1,
    },
    2013: {
        label: '',
        color: 'rgb(255,255,255)',
        points: [],
        seed: 4
    },
    2014: {
        label: '',
        color: 'rgb(136, 250, 78)',
        points: [],
        seed: 5,
    }
}

let MID = {prev: undefined, curr: 0, year: '', yearList: undefined, index: 0};
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
let graphVolHistory = [];

function replaySong() {
    AUDIO.song.play();
}

function preload() {
    console.log(' #### loading assets.')
    AUDIO.glados = loadSound('./audio/glados_intro.mp3');
    AUDIO.song = loadSound('./audio/song.mp3');
    AUDIO.gladosGraph = loadSound('./audio/glados_graph.mp3');
    AUDIO.moviesGraph = loadSound('./audio/movies_graph.mp3');
    AUDIO.gladosEnd = loadSound('./audio/glados_end.mp3');

}

function continueMid() {
    document.getElementById('continue').style.visibility = 'visible';
}

function startMid() {
    if (ismobile) {
        document.getElementById('bxt').style.left = '50%';
        document.getElementById('bxt').style["margin-left"] = '-75px';    
    }
    
    // hide terminal
    const terminal = document.getElementsByClassName("terminal")[0];
    terminal.style.display = 'none';
    document.getElementById('continue').style.visibility = 'hidden';
    
    // setting up MID data
    MID = {prev: undefined, curr: 0, year: '', yearList: undefined, index: 0};
    SCENE = mid;
    MID.yearList = Object.keys(graphData);
    MID.year = MID.yearList[MID.index];
    
    setMidPositions();
    
    // connecting amplitude to source audio
    amp = new p5.Amplitude();
    amp.setInput(AUDIO.moviesGraph);
    
    // starting audio
    AUDIO.gladosGraph.play();
    AUDIO.gladosGraph.onended(startEnd);
    AUDIO.moviesGraph.play();
    
    console.log(' #### > starting mid section')
}

function startEnd() {
    console.log(graphData)
    
    document.getElementById('bxt').style.left = '20px';
    document.getElementById('bxt').style["margin-left"] = '0px';

    // setting up END data
    SCENE = end;
    setEndPositions();
    window.postMessage('END', '*');
    const terminal = document.getElementsByClassName("terminal")[0];
    terminal.style.display = 'block';
    console.log(' #### > starting end section')
    AUDIO.gladosEnd.play();
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
            y: height - 175 - 80,
        };

        UI.volstring = {
            x: width - 35,
            y: UI.ellipse.y + 50,
        }

        UI.sampleNo = {
            x: 12,
            y: UI.ellipse.y - 50,
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
    if (width <= MINWIDTH) {
        UI.graphStartX = 10;
        UI.graphUI = {};
        UI.graphUI.indicator = {
            start: 25 + UI.graphStartX,
            end: 30 + UI.graphStartX,
        };

        UI.graphUI.line = {
            x: UI.graphUI.indicator.end + 10,
            y: {
                bottom: height - 160,
                mid: height - 280,
                high: height - 385,
            }
        };
        UI.graphEndX = width -  UI.graphUI.indicator.end
        UI.paddingGraphLine = 25;
        UI.paddingGraphText = 16
    } else {
        UI.graphStartX = 10;
        UI.graphUI = {};
        UI.graphUI.indicator = {
            start: 25 + UI.graphStartX,
            end: 30 + UI.graphStartX,
        };

        UI.graphUI.line = {
            x: UI.graphUI.indicator.end + 10,
            y: {
                bottom: height - 160,
                mid: height - 280,
                high: height - 385,
            }
        };
        UI.graphEndX = width -  UI.graphUI.indicator.end
        UI.paddingGraphLine = 25;
        UI.paddingGraphText = 16
    }
}


window.addEventListener("message", function (e) {
    if (e.data === 'START') {
        console.log(' #### STARTING P5')
        START = true;
        AUDIO.glados.play();
        AUDIO.glados.onended(continueMid);
        AUDIO.song.play();
        AUDIO.song.onended(replaySong);
        document.getElementById('welcome-message').style.visibility = 'hidden';
    }
    if (e.data ==='REPLAY') {
        // resetting the experiment
        amp = new p5.Amplitude();
        amp.setInput(AUDIO.glados);
        setIntroPositions();    
        SCENE = intro;
        START = true;
        AUDIO.glados.play();
        AUDIO.glados.onended(startMid);
        AUDIO.song.play();
        document.getElementById('restart').style.visibility = 'hidden';
        const terminal = document.getElementsByClassName("terminal")[0];
        terminal.style.display = 'block';
    }
    if (e.data === 'CONTINUE') {
        // handles mid section
        startMid()
    }
}, false);

// this draws the intro section
function intro() {
    clear();
    drawUI();
    vol = amp.getLevel();
    volhistory.push(vol);
    sampleNo += 1;
    stroke(255);
    noFill();
    push();

    beginShape();
    for (var i = 0; i < volhistory.length; i++) {
        var y = map(volhistory[i], 0, 1, height - 25, height - 450);
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

// this draw the MID section
function mid() {
    clear();
    sampleNo += 1;
    MID.curr = amp.getLevel();
    
    if (MID.prev > 0 & MID.curr === 0) {
        // change points bucket
        MID.index++
        if (MID.index === MID.yearList.length) {
            MID.prev = 0;
            return;
        }

        console.log(' #### >> fetched points: ', graphData[MID.year].points)
        MID.year = MID.yearList[MID.index];
        console.log(' #### >> CHANGING YEAR TO ', MID.year)

    }

    // storing points in bucket
    if (MID.curr > 0) graphData[MID.year].points.push(MID.curr);

    ellipse(UI.ellipse.x, UI.ellipse.y, 200, MID.curr * 200);
    textFont('monospace');
    textSize(8);

    let volstring = MID.curr.toString()
    text(volstring.substring(0, 4), UI.volstring.x, UI.volstring.y);
    text(sampleNo, UI.sampleNo.x, UI.sampleNo.y);
    
    // storing curr value for checking year change
    MID.prev = MID.curr;
}


// this handle the END section
function end() {
    clear();
    drawUI();
    const MULT_MOBILE = 300;
    const OFFSET = 100;
    const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

    Object.keys(graphData).forEach((year, index) => {
        const DATA = graphData[year];
        noiseSeed(DATA.seed);

        const points = DATA.points.map(p => map(p, 0, 1, height - 25, height - 500));

        stroke(DATA.color);
        text(year, UI.graphUI.indicator.end + index * 30 +10,height - 140 );

        const average = arrAvg(points)

        push();

        beginShape();
        xoff = 0.01
        for (var i = 0; i < (UI.graphEndX / 4 )- 4; i+=4) {
            xoff += 0.1
            let noiseVal = noise(xoff);
            var y = average - (OFFSET + 5*index) - (100 * noiseVal); // 300 mobile
            vertex(i*4 +  UI.graphUI.indicator.end,  y);
        }
        endShape();
        pop();

    })
    
    document.getElementById('restart').style.visibility = 'visible';
    START = false;
}



function setup() {
    window.postMessage('STOPLOADING', '*');
    document.getElementById('welcome-message').style.visibility = 'visible';

    console.log(' #### loading variables.')
    console.log(' #### > dpr ', window.devicePixelRatio)
    console.log(' #### > dim ', window.innerWidth, window.innerHeight)
    
    pixelDensity(window.devicePixelRatio)
    let c = createCanvas(window.innerWidth, window.innerHeight);
    c.parent("p5canvas");

    amp = new p5.Amplitude();
    amp.setInput(AUDIO.glados);
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

    
    SCENE();
    text(`width: ${width} / ismobile: ${ismobile}`, 10, 10)
}