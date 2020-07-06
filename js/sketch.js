// constants
const DEBUG = true;
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

const BUTTONS = {};
const BUTTON_STYLE ='background-color: transparent; -webkit-border-top-left-radius: 0px; -moz-border-radius-topleft: 0px; border-top-left-radius: 0px; -webkit-border-top-right-radius: 0px; -moz-border-radius-topright: 0px; border-top-right-radius: 0px; -webkit-border-bottom-right-radius: 0px; -moz-border-radius-bottomright: 0px; border-bottom-right-radius: 0px; -webkit-border-bottom-left-radius: 0px; -moz-border-radius-bottomleft: 0px; border-bottom-left-radius: 0px; text-indent: 0; border: 1px solid #ffffff; display: inline-block; color: #ffffff; font-family: monospace; font-size: 15px; font-style: normal; height: 30px; line-height: 30px; width: 100px; text-decoration: none; text-align: center;'

const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

// other stuff
let MID = { prev: undefined, curr: 0, year: '', yearList: undefined, index: 0 , wasPaused: false, changeYear: true};
let START = false;
let amp;
let sampleNo = 0;
let volhistory = [];
let ismobile = false;
let SCENE;
let SCENEPOS;
let NEXTSCENE;
let vol;
let graphVolHistory = [];
let voiceAmp;
let DRAW_MID_GRAPH = false;
let CURR_AUDIO_PLAYING = []
let REPLAYED = false;


// event handler
window.addEventListener("message", function (e) {
    if (e.data === 'START') {
        console.log(' #### STARTING P5')
        startIntro();
    }
    if (e.data === 'REPLAY') {
        // resetting the experiment
        amp = new p5.Amplitude();
        amp.setInput(AUDIO.glados);
        setIntroPositions();
        SCENE = intro;
        SCENEPOS = setIntroPositions;
        START = true;
        
        volhistory = [];
        
        AUDIO.glados.play();
        AUDIO.glados.onended(continueMid);
        // AUDIO.song.play();
        AUDIO.gladosEnd.stop();
        CURR_AUDIO_PLAYING = [AUDIO.glados, AUDIO.song];
        document.getElementById('restart').style.visibility = 'hidden';
        const terminal = document.getElementsByClassName("terminal")[0];
        terminal.style.display = 'block';
        REPLAYED = true;
        Object.values(BUTTONS).forEach(btn => btn.hide())
        BUTTONS.pauseButton.show();
        BUTTONS.muteButton.show();
        if (REPLAYED) BUTTONS.skipButton.show();
        NEXTSCENE = startMid;

        setBTNPosition() 
    }
    if (e.data === 'CONTINUE') {
        // handles mid section
        startMid()
    }
}, false);

// ###############################
// UTILITY
// ###############################


function mute() {
    const curr = getMasterVolume();
    masterVolume(curr > 0 ? 0.0 : 1.0);
    BUTTONS.muteButton.html(curr > 0 ? 'unmute': 'mute')
}

function exit() {
    window.location.href = 'https://bixuit.spindox.it'
    console.log('EXIT');
}

function replay() {
    console.log('replay');
    window.postMessage('REPLAY', '*')
}

function skip() {
    NEXTSCENE();
    window.postMessage('SKIP', '*')
    console.log('skip')
}

// this toggle audio
function toggleAudio() {
    
    console.log('toggle start: ', START)
    BUTTONS.pauseButton.html(START ? 'play': 'pause')
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

    
    START = !START
    MID.wasPaused = START;
}

function toggleStart(){
    
    START = !START
    console.log('toggled start: ', START)
}

function toggleGraph() {
    DRAW_MID_GRAPH = !DRAW_MID_GRAPH;
    console.log('toggled: ', DRAW_MID_GRAPH)
}

function replaySong() {
    if (START) AUDIO.song.play();
}

function normalizePoints(points) {
    return points.map(p => map(p, 0, 1, height - 25, height - 500))
}



// ###############################
// UI METHODS
// ###############################

// this draws the basic UI 
function drawUIDesktop() {
    let DRAW_FILL;
    const RADIUS = 5;
    const PADDING_X = 10;
    const PADDING_Y = 10;
    const TOP_H = 130;
    const BOTTOM_H = 70;
    // const MID2_H = DRAW_MID_GRAPH ? 350 : 5;//windowHeight - TOP_H - BOTTOM_H - PADDING_X * 4;
    let MID2_H;
    if (SCENE === intro) {
        MID2_H = 225;
        DRAW_FILL = true
    } else {
        MID2_H = DRAW_MID_GRAPH ? 350 : 5
        // DRAW_FILL = !DRAW_MID_GRAPH
        DRAW_FILL = true
    }

    const MID1_H = windowHeight - TOP_H - BOTTOM_H - MID2_H - PADDING_X * 5;
    



    const ALL_W = windowWidth - PADDING_X * 2;
    stroke('rgba(255, 255,255, 0.5)')
    // rect(PADDING_X, PADDING_Y, ALL_W, TOP_H, RADIUS )
    rect(PADDING_X, PADDING_Y*2 + TOP_H, ALL_W, MID1_H, RADIUS)
    if (DRAW_FILL) fill('rgba(255,255,255,0.02)')
    rect(PADDING_X, PADDING_Y*3 + TOP_H + MID1_H, ALL_W, MID2_H, RADIUS)
    
    rect(PADDING_X, PADDING_Y*4 + TOP_H + MID1_H + MID2_H, ALL_W, BOTTOM_H, RADIUS)
    noFill()


}

// this draws the graph ui (lines, scale, etc)
function drawGraphUI() {
    stroke('rgb(255,255,255');
    textFont('Monospace');
    textSize(8);
    line(UI.graphUI.indicator.start, UI.graphUI.line.y.bottom, UI.graphUI.indicator.end, UI.graphUI.line.y.bottom)
    line(UI.graphUI.indicator.start, UI.graphUI.line.y.mid, UI.graphUI.indicator.end, UI.graphUI.line.y.mid)
    line(UI.graphUI.indicator.start, UI.graphUI.line.y.high, UI.graphUI.indicator.end, UI.graphUI.line.y.high)

    noStroke();
    fill('rgb(255,255,255')
    text('0.0', UI.graphUI.indicator.start - UI.paddingGraphText, UI.graphUI.line.y.bottom)
    text('0.5', UI.graphUI.indicator.start - UI.paddingGraphText, UI.graphUI.line.y.mid)
    text('1.0', UI.graphUI.indicator.start - UI.paddingGraphText, UI.graphUI.line.y.high)
    noFill()
    stroke('rgba(0, 162, 255,1)');
    line(UI.graphUI.indicator.end, UI.graphUI.line.y.bottom, windowWidth - UI.paddingGraphLine, UI.graphUI.line.y.bottom)
    line(UI.graphUI.indicator.end, UI.graphUI.line.y.mid, windowWidth - UI.paddingGraphLine, UI.graphUI.line.y.mid)
    line(UI.graphUI.indicator.end, UI.graphUI.line.y.high, windowWidth - UI.paddingGraphLine, UI.graphUI.line.y.high)
}

function setIntroPositions() {
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
                bottom: windowHeight - 125,
                mid: windowHeight - 200,
                high: windowHeight - 275,
            }
        };

        UI.paddingGraphLine = 25;
        UI.paddingGraphText = 16
        UI.ellipse = {
            x: 125,
            y: windowHeight - 200,
        };

        UI.volstring = {
            x: 20,
            y: windowHeight - 125,
        }

        UI.sampleNo = {
            x: 20,
            y: windowHeight - 275,
        }
    }
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

// draws the live audiograph for mid section
function drawAudioGraphLive(points, cb) {
    const OFFSET = 135;
    push();
    beginShape();
    for (var i = 0; i < points.length; i++) {
        var y = map(points[i], 0, 1, height - 25, height - 500) - OFFSET;
        vertex((i * 4) + UI.graphUI.line.x, y);
    }
    endShape();
    pop();

    if (cb) cb();
}

// draws average graph
function drawAudioGraphAverage() {
    const END = SCENE === end ? 'averageEnd' : 'average';
    const OFFSET = 100;//height > 600 ? 100 : 0;

    let xoff = 0.01

    Object.keys(graphData).forEach((year, index) => {
        
        const DATA = graphData[year];
        noiseSeed(DATA.seed);

        stroke(DATA.color);
        // text(year, UI.graphUI.indicator.end + index * 30 +10, height - 140 );
        text(year, UI.graphUI.indicator.end + index * 30 + 10, UI.graphUI.line.y.bottom + 20);
        const average = DATA.points[END];

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

// ###############################
// SCENE METHODS
// ###############################

// handles the "CONTINUE BUTTON" before MID section
function continueMid() {
    if (START) {
        document.getElementById('continue').style.visibility = 'visible';
        window.postMessage('CLEAR', '*')
    }
}

function startIntro(){
    START = true;

    AUDIO.gladosEnd.stop();
    AUDIO.glados.play();
    AUDIO.glados.onended(continueMid);
    AUDIO.song.play();
    AUDIO.song.onended(replaySong);

    CURR_AUDIO_PLAYING = [AUDIO.glados, AUDIO.song];
    document.getElementById('welcome-message').style.visibility = 'hidden';

    Object.values(BUTTONS).forEach(btn => btn.hide())
    BUTTONS.pauseButton.show();
    BUTTONS.muteButton.show();
    if (REPLAYED) BUTTONS.skipButton.show();

    NEXTSCENE = startMid;
}


// starts MID section
function startMid() {
    AUDIO.glados.onended(() => {});
    AUDIO.glados.stop();
    
    if (ismobile) {
        document.getElementById('bxt').style.left = '50%';
        document.getElementById('bxt').style["margin-left"] = '-75px';
    }

    // hide terminal
    const terminal = document.getElementsByClassName("terminal")[0];
    terminal.style.display = 'none';
    document.getElementById('continue').style.visibility = 'hidden';

    // setting up MID data
    MID = { prev: undefined, curr: 0, year: '', yearList: undefined, index: 0, wasPaused: false, changeYear: true };
    SCENE = mid;
    SCENEPOS = setMidPositions;
    NEXTSCENE = startEnd;
    MID.yearList = Object.keys(graphData);
    MID.year = MID.yearList[MID.index];
    setMidPositions();
    // emptying averages
    MID.yearList.forEach(year => delete graphData[year].points.average)

    // connecting amplitude to source audio
    amp = new p5.Amplitude();
    amp.setInput(AUDIO.moviesGraph);
    voiceAmp = new p5.Amplitude();
    voiceAmp.setInput(AUDIO.gladosGraph);

    // starting and storing current audio playing for play/pause
    AUDIO.gladosGraph.play();
    AUDIO.gladosGraph.onended(startEnd);
    AUDIO.moviesGraph.play();
    CURR_AUDIO_PLAYING = [AUDIO.gladosGraph, AUDIO.moviesGraph, AUDIO.song];

    Object.values(BUTTONS).forEach(btn => btn.hide())
    BUTTONS.toggleButton.show();
    BUTTONS.pauseButton.show();
    BUTTONS.muteButton.show();
    if (REPLAYED) BUTTONS.skipButton.show();

    console.log(' #### > starting mid section')
}

// starts END section
function startEnd() {
    if (!START) return;
    clear();
    AUDIO.gladosGraph.onended(() => {});
    AUDIO.gladosGraph.stop();
    AUDIO.moviesGraph.stop();
    console.log(graphData);

    DRAW_MID_GRAPH = true;
    // moving logo back
    document.getElementById('bxt').style.left = '20px';
    document.getElementById('bxt').style["margin-left"] = '0px';

    // setting up END data
    SCENE = end;
    SCENEPOS = setEndPositions;
    NEXTSCENE = startIntro;
    setEndPositions();

    // triggering text
    window.postMessage('END', '*');
    const terminal = document.getElementsByClassName("terminal")[0];
    terminal.style.display = 'block';

    // triggering and storing audio
    AUDIO.gladosEnd.play();
    CURR_AUDIO_PLAYING = [AUDIO.gladosEnd, AUDIO.song];

    setBTNPosition(true);

    Object.values(BUTTONS).forEach(btn => btn.hide())

    BUTTONS.pauseButton.show();
    BUTTONS.muteButton.show();
    BUTTONS.exitButton.show();
    BUTTONS.replayButton.show();
    // if (REPLAYED) BUTTONS.skipButton.show();
    console.log(' #### > starting end section')
}






// this draws the intro section
function intro() {
    clear();
    drawGraphUI();
    vol = amp.getLevel();
    volhistory.push(vol);
    sampleNo += 1;
    stroke(255);
    noFill();
    push();

    beginShape();
    for (var i = 0; i < volhistory.length; i++) {
        var y = map(volhistory[i], 0, 1, height - 125, height - 550);
        vertex((i * 4) + UI.graphUI.line.x, y);
    }
    endShape();
    pop();

    if (volhistory.length * 4 > (windowWidth) - 50 - UI.graphUI.line.x) {
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


    // this sucks
    // console.log(MID.curr, MID.wasPaused)
    if (MID.curr === 0 && MID.wasPaused) MID.changeYear = false;
    if (MID.curr > 0 && MID.wasPaused) {
        MID.wasPaused = false;
        MID.changeYear= true
    }



    // change year
    if (MID.prev > 0 && MID.curr === 0 && MID.changeYear) {
        console.log('change year', MID.changeYear)
        console.log(MID.prev , MID.curr)
        // change points bucket
        console.log('qua non devo entrare')
        MID.index++
        if (MID.index === MID.yearList.length) {
            graphData[MID.year].points.normalized = normalizePoints(graphData[MID.year].points.raw)
            graphData[MID.year].points.average = arrAvg(graphData[MID.year].points.normalized);
            graphData[MID.year].points.averageEnd = graphData[MID.year].points.average
            graphData[MID.year].points.window = [];
            MID.prev = 0;
            return;
        }

        console.log(' #### >> fetched points: ', graphData[MID.year].points.raw)

        // storing points 
        graphData[MID.year].points.normalized = normalizePoints(graphData[MID.year].points.raw)
        graphData[MID.year].points.average = arrAvg(graphData[MID.year].points.normalized);
        graphData[MID.year].points.averageEnd = graphData[MID.year].points.average
        // emptying point window, we don't need that anymore
        graphData[MID.year].points.window = [];

        // changing year
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
        drawGraphUI();
        const cb = drawAudioGraphAverage;

        // draw live window
        stroke(graphData[MID.year].color)
        drawAudioGraphLive(graphData[MID.year].points.window, cb);
    } 

    // resetting stroke color
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

// this handle the END section
function end() {
    clear();
    drawGraphUI();
    drawAudioGraphAverage()

    document.getElementById('restart').style.visibility = 'visible';
    START = false;
}


// ###############################
// P5 STANDARD FUNCTIONS
// ###############################

function preload() {
    console.log(' #### loading assets.')
    AUDIO.glados = loadSound('./audio/glados_intro.mp3');
    AUDIO.song = loadSound('./audio/song.mp3');
    AUDIO.gladosGraph = loadSound('./audio/glados_graph.mp3');
    AUDIO.moviesGraph = loadSound('./audio/movies_graph.mp3');
    AUDIO.gladosEnd = loadSound('./audio/glados_end.mp3');

}

function setBTNPosition(bypass_offset) {
    const OFFSET = REPLAYED && !bypass_offset ? 120 : 0;
    BUTTONS.muteButton.position(windowWidth - 120 - OFFSET, windowHeight - 60);
    BUTTONS.pauseButton.position(windowWidth - 240 - OFFSET, windowHeight - 60);
    BUTTONS.toggleButton.position(windowWidth - 360 - OFFSET, windowHeight - 60);
    BUTTONS.replayButton.position(windowWidth - 360 - OFFSET, windowHeight - 60);
    BUTTONS.exitButton.position(windowWidth - 480 - OFFSET, windowHeight - 60);
    BUTTONS.skipButton.position(windowWidth - 120, windowHeight - 60);

}

function setup() {
    smooth()
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

    // creating buttons
    BUTTONS.toggleButton = createButton('toggle');
    BUTTONS.toggleButton.style(BUTTON_STYLE)
    BUTTONS.toggleButton.mousePressed(toggleGraph);

    BUTTONS.pauseButton = createButton('pause');
    BUTTONS.pauseButton.style(BUTTON_STYLE)
    BUTTONS.pauseButton.mousePressed(toggleAudio);

    BUTTONS.muteButton = createButton('mute');
    BUTTONS.muteButton.style(BUTTON_STYLE)
    BUTTONS.muteButton.mousePressed(mute);

    BUTTONS.replayButton = createButton('replay');
    BUTTONS.replayButton.style(BUTTON_STYLE)
    BUTTONS.replayButton.mousePressed(replay);

    BUTTONS.exitButton = createButton('exit');
    BUTTONS.exitButton.style(BUTTON_STYLE)
    BUTTONS.exitButton.mousePressed(exit);

    BUTTONS.skipButton = createButton('skip');
    BUTTONS.skipButton.style(BUTTON_STYLE)
    BUTTONS.skipButton.mousePressed(skip);

    Object.values(BUTTONS).forEach(btn => btn.hide())

    setBTNPosition();
}

function draw() {
    if (!START) return;

    
    SCENE();
    drawUIDesktop()
    if (DEBUG) text(`width: ${width} / height: ${height} / ismobile: ${ismobile}`, 10, 10);
}

function windowResized() {
    SCENEPOS();
    setBTNPosition()
}