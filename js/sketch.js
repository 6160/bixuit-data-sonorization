// constants
const DEBUG = false;
const MINWIDTH = 480;
const UI = {};
const AUDIO = {};
const graphData = {
    2010: {
        label: '',
        color: 'rgb(214, 169, 75)',
        points: {
            raw: [],
            normalized: [],
            window: [],
        },
        seed: 2,
    },
    2011: {
        label: '',
        color: 'rgb(66, 130, 247)',//'rgb(11, 30, 99)',//,
        points: {
            raw: [],
            normalized: [],
            window: [],
        },
        seed: 13,
    },
    2012: {
        label: '',
        color: 'rgb(243, 5, 2)',
        points: {
            raw: [],
            normalized: [],
            window: [],
        },
        seed: 1,
    },
    2013: {
        label: '',
        color: 'rgb(255,255,255)',
        points: {
            raw: [],
            normalized: [],
            window: [],
        },
        seed: 4
    },
    2014: {
        label: '',
        color: 'rgb(136, 250, 78)',
        points: {
            raw: [],
            normalized: [],
            window: [],
        },
        seed: 5,
    }
}


const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

// other stuff
let MID = { prev: undefined, curr: 0, year: '', yearList: undefined, index: 0 };
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
let SCENEPOS;
let vol;
let graphVolHistory = [];
let voiceAmp;
let DRAW_MID_GRAPH = true;
let CURR_AUDIO_PLAYING = []

function windowResized() {
    console.log('TRIGGERED RESIZE')
    SCENEPOS();
}

// event handler
window.addEventListener("message", function (e) {
    if (e.data === 'START') {
        console.log(' #### STARTING P5')
        START = true;
        AUDIO.glados.play();
        AUDIO.glados.onended(continueMid);
        AUDIO.song.play();
        AUDIO.song.onended(replaySong);

        CURR_AUDIO_PLAYING = [AUDIO.glados, AUDIO.song];
        document.getElementById('welcome-message').style.visibility = 'hidden';
    }
    if (e.data === 'REPLAY') {
        // resetting the experiment
        amp = new p5.Amplitude();
        amp.setInput(AUDIO.glados);
        setIntroPositions();
        SCENE = intro;
        SCENEPOS = setIntroPositions;
        START = true;
        AUDIO.glados.play();
        AUDIO.glados.onended(startMid);
        AUDIO.song.play();
        CURR_AUDIO_PLAYING = [AUDIO.glados, AUDIO.song];
        document.getElementById('restart').style.visibility = 'hidden';
        const terminal = document.getElementsByClassName("terminal")[0];
        terminal.style.display = 'block';
    }
    if (e.data === 'CONTINUE') {
        // handles mid section
        startMid()
    }
}, false);

function replaySong() {
    if(START) AUDIO.song.play();
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
    console.log('TRIGGERED FUCKIN END')
    if(START) document.getElementById('continue').style.visibility = 'visible';
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
    MID = { prev: undefined, curr: 0, year: '', yearList: undefined, index: 0 };
    SCENE = mid;
    SCENEPOS = setMidPositions;
    MID.yearList = Object.keys(graphData);
    MID.year = MID.yearList[MID.index];

    setMidPositions();

    // connecting amplitude to source audio
    amp = new p5.Amplitude();
    amp.setInput(AUDIO.moviesGraph);

    voiceAmp = new p5.Amplitude();
    voiceAmp.setInput(AUDIO.gladosGraph);

    // starting audio
    AUDIO.gladosGraph.play();
    AUDIO.gladosGraph.onended(startEnd);
    AUDIO.moviesGraph.play();
    CURR_AUDIO_PLAYING = [AUDIO.gladosGraph, AUDIO.moviesGraph, AUDIO.song];

    console.log(' #### > starting mid section')
}

function startEnd() {
    console.log(graphData)

    document.getElementById('bxt').style.left = '20px';
    document.getElementById('bxt').style["margin-left"] = '0px';

    // setting up END data
    SCENE = end;
    SCENEPOS = setEndPositions;
    setEndPositions();
    window.postMessage('END', '*');
    const terminal = document.getElementsByClassName("terminal")[0];
    terminal.style.display = 'block';
    console.log(' #### > starting end section')
    AUDIO.gladosEnd.play();
    CURR_AUDIO_PLAYING = [AUDIO.gladosEnd, AUDIO.song];
}

function setIntroPositions() {
    console.log('calledfihiugfhreiughreuighreuigheriu: ', windowWidth, windowHeight)
    if (windowWidth <= MINWIDTH) {
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
                bottom: windowHeight - 25,
                mid: windowHeight - 100,
                high: windowHeight - 175,
            }
        };

        UI.paddingGraphLine = 25;
        UI.paddingGraphText = 16
        UI.ellipse = {
            x: windowWidth / 2,
            y: windowWidth < 380 ? windowHeight - 175 - 70 : windowHeight - 175 - 80,
        };

        UI.volstring = {
            x: windowWidth - 35,
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
                bottom: windowHeight - 25,
                mid: windowHeight - 100,
                high: windowHeight - 175,
            }
        };

        UI.paddingGraphLine = 25;
        UI.paddingGraphText = 16
        UI.ellipse = {
            x: 125,
            y: windowHeight - 100,
        };

        UI.volstring = {
            x: 20,
            y: windowHeight - 25,
        }

        UI.sampleNo = {
            x: 20,
            y: windowHeight - 175,
        }
    }

    console.log(UI)
}

function setMidPositions() {
    // desktop
    if (windowWidth <= MINWIDTH) {
        UI.graphStartX = 10;
        UI.graphUI = {};
        UI.graphUI.indicator = {
            start: 25 + UI.graphStartX,
            end: 30 + UI.graphStartX,
        };

        UI.graphUI.line = {
            x: UI.graphUI.indicator.end + 10,
            y: {
                bottom: windowHeight > 600 ? windowHeight - 160 : windowHeight - 100,
                mid: windowHeight > 600 ? windowHeight - 280 : windowHeight - 220,
                high: windowHeight > 600 ? windowHeight - 385 : windowHeight - 325,
            }
        };
        UI.graphEndX = windowWidth - UI.graphUI.indicator.end
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
                bottom: windowHeight - 160,
                mid: windowHeight - 280,
                high: windowHeight - 385,
            }
        };
        UI.graphEndX = windowWidth - UI.graphUI.indicator.end
        UI.paddingGraphLine = 25;
        UI.paddingGraphText = 16
    }
   
   
   
   
   
    UI.ellipse = {
        x: windowWidth / 2,
        y: windowHeight / 2,
    };

    UI.volstring = {
        x: (windowWidth / 2) + 100,
        y: (windowHeight / 2) + 75,
    }

    UI.sampleNo = {
        x: (windowWidth / 2) - 100,
        y: (windowHeight / 2) - 75,
    }
}

function setEndPositions() {
    if (windowWidth <= MINWIDTH) {
        UI.graphStartX = 10;
        UI.graphUI = {};
        UI.graphUI.indicator = {
            start: 25 + UI.graphStartX,
            end: 30 + UI.graphStartX,
        };

        UI.graphUI.line = {
            x: UI.graphUI.indicator.end + 10,
            y: {
                bottom: windowHeight > 600 ? windowHeight - 160 : windowHeight - 100,
                mid: windowHeight > 600 ? windowHeight - 280 : windowHeight - 220,
                high: windowHeight > 600 ? windowHeight - 385 : windowHeight - 325,
            }
        };
        UI.graphEndX = windowWidth - UI.graphUI.indicator.end
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
                bottom: windowHeight - 160,
                mid: windowHeight - 280,
                high: windowHeight - 385,
            }
        };
        UI.graphEndX = windowWidth - UI.graphUI.indicator.end
        UI.paddingGraphLine = 25;
        UI.paddingGraphText = 16
    }
}

function normalizePoints(points) {
    return points.map(p => map(p, 0, 1, height - 25, height - 500))
}



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
    sampleNo++;
    MID.curr = amp.getLevel();

    // change year
    if (MID.prev > 0 & MID.curr === 0) {
        // change points bucket
        MID.index++
        if (MID.index === MID.yearList.length) {
            graphData[MID.year].points.normalized = normalizePoints(graphData[MID.year].points.raw)
            graphData[MID.year].points.average = arrAvg(graphData[MID.year].points.normalized);
            MID.prev = 0;
            return;
        }

        console.log(' #### >> fetched points: ', graphData[MID.year].points.raw)
        
        // storing points 
        graphData[MID.year].points.normalized = normalizePoints(graphData[MID.year].points.raw)
        graphData[MID.year].points.average = arrAvg(graphData[MID.year].points.normalized);
        
        // emptying point window, we don't need that anymore
        graphData[MID.year].points.window = [];
        
        MID.year = MID.yearList[MID.index];
        console.log(' #### >> CHANGING YEAR TO ', MID.year)
    }

    // storing points in bucket
    if (MID.curr > 0) graphData[MID.year].points.raw.push(MID.curr);

    // storing points for live graph
    if (MID.curr) graphData[MID.year].points.window.push(MID.curr);
    if (graphData[MID.year].points.window.length * 4 > (width) - 50 - UI.graphUI.line.x) {
        graphData[MID.year].points.window = [];
    }





    // drawing graph
    if (DRAW_MID_GRAPH) {
        drawUI();
        const cb = drawAudioGraphAverage;
        // draw live window
        stroke(graphData[MID.year].color)
        drawAudioGraphLive(graphData[MID.year].points.window, cb);
    }

    stroke('rgb(255,255,255');

    // drawing mouth
    ellipse(UI.ellipse.x, UI.ellipse.y, 200, (MID.curr || voiceAmp.getLevel()) * 200);
    textFont('monospace');
    textSize(8);

    // drawing framecount and vol value
    let volstring = MID.curr.toString()
    text(volstring.substring(0, 4), UI.volstring.x, UI.volstring.y);
    text(sampleNo, UI.sampleNo.x, UI.sampleNo.y);

    // storing curr value for checking year change
    MID.prev = MID.curr;
}

function drawAudioGraphLive(points, cb) {
    const OFFSET = 135;
    beginShape();
    for (var i = 0; i < points.length; i++) {
        var y = map(points[i], 0, 1, height - 25, height - 500) - OFFSET;
        vertex((i * 4) + UI.graphUI.line.x, y);
    }
    endShape();
    pop();

    if (cb) cb();
}



function drawAudioGraphAverage() {
    const OFFSET = 100;//height > 600 ? 100 : 0;
    
    let xoff = 0.01

    Object.keys(graphData).forEach((year, index) => {
        const DATA = graphData[year];
        noiseSeed(DATA.seed);

        stroke(DATA.color);
        // text(year, UI.graphUI.indicator.end + index * 30 +10, height - 140 );
        text(year, UI.graphUI.indicator.end + index * 30 + 10, UI.graphUI.line.y.bottom + 20);
        const average = DATA.points.average;

        push();
        beginShape();
        
        for (var i = 0; i < (UI.graphEndX / 4) - 4; i += 4) {
            xoff += 0.1
            let noiseVal = noise(xoff);
            var y = average - (OFFSET + 5 * index) - (100 * noiseVal); // 300 mobile
            vertex(i * 4 + UI.graphUI.indicator.end, y);
        }
        endShape();
        pop();
    })

}

// this handle the END section
function end() {
    clear();
    drawUI();
    drawAudioGraphAverage()

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
    SCENEPOS = setIntroPositions;
    
    
    toggleButton = createButton('toggle');
    toggleButton.position(319, 19);
    toggleButton.mousePressed(toggleGraph);

    pauseButton = createButton('pause');
    pauseButton.position(419, 19);
    pauseButton.mousePressed(pauseAll);


}

function pauseAll() {
    START = !START
    console.log('toggle start: ', START)
    
    // NEED TO STOP AUDIO AND TEXT
    window.postMessage('PAUSE', '*');
    console.log(CURR_AUDIO_PLAYING)
    CURR_AUDIO_PLAYING.forEach(a => {
        if (a.isPlaying()) {
            a.pause();
        } else {
            a.play();
        }
    })
}

function toggleGraph() {
    
    DRAW_MID_GRAPH = !DRAW_MID_GRAPH;
    console.log('toggled: ',DRAW_MID_GRAPH)
}

function drawUI() {
    stroke('rgb(255,255,255');
    textFont('Monospace');
    textSize(8);
    line(UI.graphUI.indicator.start, UI.graphUI.line.y.bottom, UI.graphUI.indicator.end, UI.graphUI.line.y.bottom)
    line(UI.graphUI.indicator.start, UI.graphUI.line.y.mid, UI.graphUI.indicator.end, UI.graphUI.line.y.mid)
    line(UI.graphUI.indicator.start, UI.graphUI.line.y.high, UI.graphUI.indicator.end, UI.graphUI.line.y.high)

    text('0.0', UI.graphUI.indicator.start - UI.paddingGraphText, UI.graphUI.line.y.bottom)
    text('0.5', UI.graphUI.indicator.start - UI.paddingGraphText, UI.graphUI.line.y.mid)
    text('1.0', UI.graphUI.indicator.start - UI.paddingGraphText, UI.graphUI.line.y.high)

    stroke('rgba(0, 162, 255,1)');
    line(UI.graphUI.indicator.end, UI.graphUI.line.y.bottom, windowWidth - UI.paddingGraphLine, UI.graphUI.line.y.bottom)
    line(UI.graphUI.indicator.end, UI.graphUI.line.y.mid, windowWidth - UI.paddingGraphLine, UI.graphUI.line.y.mid)
    line(UI.graphUI.indicator.end, UI.graphUI.line.y.high, windowWidth - UI.paddingGraphLine, UI.graphUI.line.y.high)
}


function draw() {
    if (!START) return;

    SCENE();
    if (DEBUG) text(`width: ${width} / height: ${height} / ismobile: ${ismobile}`, 10, 10);
}