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
const BUTTON_STYLE_DESKTOP = 'background-color: transparent; -webkit-border-top-left-radius: 0px; -moz-border-radius-topleft: 0px; border-top-left-radius: 0px; -webkit-border-top-right-radius: 0px; -moz-border-radius-topright: 0px; border-top-right-radius: 0px; -webkit-border-bottom-right-radius: 0px; -moz-border-radius-bottomright: 0px; border-bottom-right-radius: 0px; -webkit-border-bottom-left-radius: 0px; -moz-border-radius-bottomleft: 0px; border-bottom-left-radius: 0px; text-indent: 0; border: 1px solid #ffffff; display: inline-block; color: #ffffff; font-family: monospace; font-size: 15px; font-style: normal; height: 30px; line-height: 30px; width: 100px; text-decoration: none; text-align: center;'
const BUTTON_STYLE_MOBILE = 'background-color: transparent; padding: 0px;-webkit-border-top-left-radius: 5px; -moz-border-radius-topleft: 5px; border-top-left-radius: 5px; -webkit-border-top-right-radius: 5px; -moz-border-radius-topright: 5px; border-top-right-radius: 5px; -webkit-border-bottom-right-radius: 5px; -moz-border-radius-bottomright: 5px; border-bottom-right-radius: 5px; -webkit-border-bottom-left-radius: 5px; -moz-border-radius-bottomleft: 5px; border-bottom-left-radius: 5px; text-indent: 0; border: 1px solid #ffffff; display: inline-block; color: #ffffff; font-family: monospace; font-size: 8px; font-style: normal; height: 40px; line-height: 16px; width: 40px; text-decoration: none; text-align: center;'

const BUTTON_STYLE_2010_MOBILE = 'background-color: transparent; -webkit-border-top-left-radius: 5px; -moz-border-radius-topleft: 5px; border-top-left-radius: 5px; -webkit-border-top-right-radius: 5px; -moz-border-radius-topright: 5px; border-top-right-radius: 5px; -webkit-border-bottom-right-radius: 5px; -moz-border-radius-bottomright: 5px; border-bottom-right-radius: 5px; -webkit-border-bottom-left-radius: 5px; -moz-border-radius-bottomleft: 5px; border-bottom-left-radius: 5px; text-indent: 0; border: 1px solid #d6a94b; display: inline-block; color: #d6a94b; font-family: monospace; font-size: 8px; font-style: normal; height: 40px; line-height: 16px; width: 40px; text-decoration: none; text-align: center;';
const BUTTON_STYLE_2011_MOBILE = 'background-color: transparent; -webkit-border-top-left-radius: 5px; -moz-border-radius-topleft: 5px; border-top-left-radius: 5px; -webkit-border-top-right-radius: 5px; -moz-border-radius-topright: 5px; border-top-right-radius: 5px; -webkit-border-bottom-right-radius: 5px; -moz-border-radius-bottomright: 5px; border-bottom-right-radius: 5px; -webkit-border-bottom-left-radius: 5px; -moz-border-radius-bottomleft: 5px; border-bottom-left-radius: 5px; text-indent: 0; border: 1px solid rgb(66, 130, 247); display: inline-block; color: rgb(66, 130, 247); font-family: monospace; font-size: 8px; font-style: normal; height: 40px; line-height: 16px; width: 40px; text-decoration: none; text-align: center;';
const BUTTON_STYLE_2012_MOBILE = 'background-color: transparent; -webkit-border-top-left-radius: 5px; -moz-border-radius-topleft: 5px; border-top-left-radius: 5px; -webkit-border-top-right-radius: 5px; -moz-border-radius-topright: 5px; border-top-right-radius: 5px; -webkit-border-bottom-right-radius: 5px; -moz-border-radius-bottomright: 5px; border-bottom-right-radius: 5px; -webkit-border-bottom-left-radius: 5px; -moz-border-radius-bottomleft: 5px; border-bottom-left-radius: 5px; text-indent: 0; border: 1px solid rgb(243, 5, 2); display: inline-block; color: rgb(243, 5, 2); font-family: monospace; font-size: 8px; font-style: normal; height: 40px; line-height: 16px; width: 40px; text-decoration: none; text-align: center;';
const BUTTON_STYLE_2013_MOBILE = 'background-color: transparent; -webkit-border-top-left-radius: 5px; -moz-border-radius-topleft: 5px; border-top-left-radius: 5px; -webkit-border-top-right-radius: 5px; -moz-border-radius-topright: 5px; border-top-right-radius: 5px; -webkit-border-bottom-right-radius: 5px; -moz-border-radius-bottomright: 5px; border-bottom-right-radius: 5px; -webkit-border-bottom-left-radius: 5px; -moz-border-radius-bottomleft: 5px; border-bottom-left-radius: 5px; text-indent: 0; border: 1px solid rgb(255,255,255); display: inline-block; color: rgb(255,255,255); font-family: monospace; font-size: 8px; font-style: normal; height: 40px; line-height: 16px; width: 40px; text-decoration: none; text-align: center;';
const BUTTON_STYLE_2014_MOBILE = 'background-color: transparent; -webkit-border-top-left-radius: 5px; -moz-border-radius-topleft: 5px; border-top-left-radius: 5px; -webkit-border-top-right-radius: 5px; -moz-border-radius-topright: 5px; border-top-right-radius: 5px; -webkit-border-bottom-right-radius: 5px; -moz-border-radius-bottomright: 5px; border-bottom-right-radius: 5px; -webkit-border-bottom-left-radius: 5px; -moz-border-radius-bottomleft: 5px; border-bottom-left-radius: 5px; text-indent: 0; border: 1px solid rgb(136, 250, 78); display: inline-block; color: rgb(136, 250, 78); font-family: monospace; font-size: 8px; font-style: normal; height: 40px; line-height: 16px; width: 40px; text-decoration: none; text-align: center;';

const BUTTON_STYLE_2010_DESKTOP = 'background-color: transparent; -webkit-border-top-left-radius: 0px; -moz-border-radius-topleft: 0px; border-top-left-radius: 0px; -webkit-border-top-right-radius: 0px; -moz-border-radius-topright: 0px; border-top-right-radius: 0px; -webkit-border-bottom-right-radius: 0px; -moz-border-radius-bottomright: 0px; border-bottom-right-radius: 0px; -webkit-border-bottom-left-radius: 0px; -moz-border-radius-bottomleft: 0px; border-bottom-left-radius: 0px; text-indent: 0; border: 1px solid #d6a94b; display: inline-block; color: rgb(214, 169, 75); font-family: monospace; font-size: 15px; font-style: normal; height: 30px; line-height: 30px; width: 100px; text-decoration: none; text-align: center;';
const BUTTON_STYLE_2011_DESKTOP = 'background-color: transparent; -webkit-border-top-left-radius: 0px; -moz-border-radius-topleft: 0px; border-top-left-radius: 0px; -webkit-border-top-right-radius: 0px; -moz-border-radius-topright: 0px; border-top-right-radius: 0px; -webkit-border-bottom-right-radius: 0px; -moz-border-radius-bottomright: 0px; border-bottom-right-radius: 0px; -webkit-border-bottom-left-radius: 0px; -moz-border-radius-bottomleft: 0px; border-bottom-left-radius: 0px; text-indent: 0; border: 1px solid rgb(66, 130, 247); display: inline-block; color: rgb(66, 130, 247); font-family: monospace; font-size: 15px; font-style: normal; height: 30px; line-height: 30px; width: 100px; text-decoration: none; text-align: center;';
const BUTTON_STYLE_2012_DESKTOP = 'background-color: transparent; -webkit-border-top-left-radius: 0px; -moz-border-radius-topleft: 0px; border-top-left-radius: 0px; -webkit-border-top-right-radius: 0px; -moz-border-radius-topright: 0px; border-top-right-radius: 0px; -webkit-border-bottom-right-radius: 0px; -moz-border-radius-bottomright: 0px; border-bottom-right-radius: 0px; -webkit-border-bottom-left-radius: 0px; -moz-border-radius-bottomleft: 0px; border-bottom-left-radius: 0px; text-indent: 0; border: 1px solid rgb(243, 5, 2); display: inline-block; color: rgb(243, 5, 2); font-family: monospace; font-size: 15px; font-style: normal; height: 30px; line-height: 30px; width: 100px; text-decoration: none; text-align: center;';
const BUTTON_STYLE_2013_DESKTOP = 'background-color: transparent; -webkit-border-top-left-radius: 0px; -moz-border-radius-topleft: 0px; border-top-left-radius: 0px; -webkit-border-top-right-radius: 0px; -moz-border-radius-topright: 0px; border-top-right-radius: 0px; -webkit-border-bottom-right-radius: 0px; -moz-border-radius-bottomright: 0px; border-bottom-right-radius: 0px; -webkit-border-bottom-left-radius: 0px; -moz-border-radius-bottomleft: 0px; border-bottom-left-radius: 0px; text-indent: 0; border: 1px solid rgb(255,255,255); display: inline-block; color: rgb(255,255,255); font-family: monospace; font-size: 15px; font-style: normal; height: 30px; line-height: 30px; width: 100px; text-decoration: none; text-align: center;';
const BUTTON_STYLE_2014_DESKTOP = 'background-color: transparent; -webkit-border-top-left-radius: 0px; -moz-border-radius-topleft: 0px; border-top-left-radius: 0px; -webkit-border-top-right-radius: 0px; -moz-border-radius-topright: 0px; border-top-right-radius: 0px; -webkit-border-bottom-right-radius: 0px; -moz-border-radius-bottomright: 0px; border-bottom-right-radius: 0px; -webkit-border-bottom-left-radius: 0px; -moz-border-radius-bottomleft: 0px; border-bottom-left-radius: 0px; text-indent: 0; border: 1px solid rgb(136, 250, 78); display: inline-block; color: rgb(136, 250, 78); font-family: monospace; font-size: 15px; font-style: normal; height: 30px; line-height: 30px; width: 100px; text-decoration: none; text-align: center;';


const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

// other stuff
let MID = { prev: undefined, curr: 0, year: '', yearList: undefined, index: 0, wasPaused: false, changeYear: true };
let MID_UI_MOBILE = {};
let MID_UI_DESKTOP = {};
let START = false;
let amp;
let sampleNo = 0;
let volhistory = [];
let ismobile = window.matchMedia("only screen and (max-width: 760px)").matches
let SCENE;
let SCENEPOS;
let NEXTSCENE;
let vol;
let graphVolHistory = [];
let voiceAmp;
let DRAW_MID_GRAPH = false;
let CURR_AUDIO_PLAYING = []
let REPLAYED = false;
let setBTNPosition;
let W_HEIGHT;
let W_WIDTH;
let OVERLAYS = {};
let GLOBALSTART = false;

// event handler
window.addEventListener("message", function (e) {
    if (e.data === 'START') {
        console.log(' #### STARTING P5')
        const terminal = document.getElementsByClassName("terminal")[0];
        terminal.style.opacity = '1';
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
        // document.getElementById('restart').style.visibility = 'hidden';
        const terminal = document.getElementsByClassName("terminal")[0];
        terminal.style.display = 'block';
        REPLAYED = true;

        setBTNPosition()
        Object.values(BUTTONS).forEach(btn => btn.hide())
        BUTTONS.pauseButton.show();
        BUTTONS.muteButton.show();
        if (REPLAYED) BUTTONS.skipButton.show();
        NEXTSCENE = startMid;




    }
    if (e.data === 'CONTINUE') {
        // handles mid section
        startMid()
    }
}, false);

// ###############################
// UTILITY
// ###############################


function mute(event) {
    const curr = getMasterVolume();
    masterVolume(curr > 0 ? 0.0 : 1.0);
    BUTTONS.muteButton.html(curr > 0 ? 'unmute' : 'mute')
}

function exit() {
    window.location.href = 'https://bixuit.spindox.it/data-sonorization/'
}

function replay() {
    console.log('replay');
    window.postMessage('REPLAY', '*')
}

function skip() {
    NEXTSCENE();
    window.postMessage('SKIP', '*')
}

// this toggle audio
function toggleAudio() {
    BUTTONS.pauseButton.html(START ? 'play' : 'pause')
    // NEED TO STOP AUDIO AND TEXT
    window.postMessage('PAUSE', '*');
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

function toggleStart() {
    START = !START
}

function toggleGraph() {
    DRAW_MID_GRAPH = !DRAW_MID_GRAPH;
    SCENEPOS();
}

function replaySong() {
    if (START) AUDIO.song.play();
}

function normalizePoints(points) {
    return points.map(p => map(p, 0, 0.5, UI.graphUI.line.y.bottom, UI.graphUI.line.y.high)) //heigth
}



// ###############################
// UI METHODS
// ###############################

function setBTNPositionDesktop(bypass_offset) {
    const OFFSET = REPLAYED && !bypass_offset ? 120 : 0;
    BUTTONS.muteButton.position(W_WIDTH - 120 - OFFSET, W_HEIGHT - 60);
    BUTTONS.pauseButton.position(W_WIDTH - 240 - OFFSET, W_HEIGHT - 60);
    BUTTONS.toggleButton.position(W_WIDTH - 360 - OFFSET, W_HEIGHT - 60);
    BUTTONS.replayButton.position(W_WIDTH - 240 - OFFSET, W_HEIGHT - 60);
    BUTTONS.exitButton.position(W_WIDTH - 360 - OFFSET, W_HEIGHT - 60);
    BUTTONS.skipButton.position(W_WIDTH - 120, W_HEIGHT - 60);

    BUTTONS.aButton.position(20, W_HEIGHT - 60);
    BUTTONS.bButton.position(140, W_HEIGHT - 60);
    BUTTONS.cButton.position(260, W_HEIGHT - 60);
    BUTTONS.dButton.position(380, W_HEIGHT - 60);
    BUTTONS.eButton.position(500, W_HEIGHT - 60);




    Object.values(BUTTONS).forEach(button => {
        button.style(BUTTON_STYLE_DESKTOP)
    })

    BUTTONS.aButton.style(BUTTON_STYLE_2010_DESKTOP)
    BUTTONS.bButton.style(BUTTON_STYLE_2011_DESKTOP)
    BUTTONS.cButton.style(BUTTON_STYLE_2012_DESKTOP)
    BUTTONS.dButton.style(BUTTON_STYLE_2013_DESKTOP)
    BUTTONS.eButton.style(BUTTON_STYLE_2014_DESKTOP)

}

function setBTNPositionMobile(bypass_offset) {
    const OFFSET = REPLAYED && !bypass_offset ? 50 : 0;
    const PADDING_BOTTOM = 50;
    BUTTONS.muteButton.position(W_WIDTH - 50 - OFFSET, W_HEIGHT - PADDING_BOTTOM);
    BUTTONS.pauseButton.position(W_WIDTH - 95 - OFFSET, W_HEIGHT - PADDING_BOTTOM);
    BUTTONS.toggleButton.position(W_WIDTH - 140 - OFFSET, W_HEIGHT - PADDING_BOTTOM);
    BUTTONS.replayButton.position(W_WIDTH - 95 - OFFSET, W_HEIGHT - PADDING_BOTTOM);
    BUTTONS.exitButton.position(W_WIDTH - 140 - OFFSET, W_HEIGHT - PADDING_BOTTOM);
    BUTTONS.skipButton.position(W_WIDTH - 50, W_HEIGHT - PADDING_BOTTOM);

    BUTTONS.aButton.position(10, W_HEIGHT - PADDING_BOTTOM);
    BUTTONS.bButton.position(55, W_HEIGHT - PADDING_BOTTOM);
    BUTTONS.cButton.position(100, W_HEIGHT - PADDING_BOTTOM);
    BUTTONS.dButton.position(145, W_HEIGHT - PADDING_BOTTOM);
    BUTTONS.eButton.position(190, W_HEIGHT - PADDING_BOTTOM);

    Object.values(BUTTONS).forEach(button => {
        button.style(BUTTON_STYLE_MOBILE)

    })

    BUTTONS.aButton.style(BUTTON_STYLE_2010_MOBILE)
    BUTTONS.bButton.style(BUTTON_STYLE_2011_MOBILE)
    BUTTONS.cButton.style(BUTTON_STYLE_2012_MOBILE)
    BUTTONS.dButton.style(BUTTON_STYLE_2013_MOBILE)
    BUTTONS.eButton.style(BUTTON_STYLE_2014_MOBILE)
}



// this draws the basic UI 
function drawUIDesktop() {
    let DRAW_FILL;
    MID_UI_DESKTOP.RADIUS = 5;
    MID_UI_DESKTOP.PADDING_X = 10;
    MID_UI_DESKTOP.PADDING_Y = 10;
    MID_UI_DESKTOP.TOP_H = 130;
    MID_UI_DESKTOP.BOTTOM_H = 70;
    // MID_UI_DESKTOP.MID2_H = DRAW_MID_GRAPH ? 350 : 5;//W_HEIGHT - TOP_H - BOTTOM_H - PADDING_X * 4;

    if (SCENE === intro) {
        MID_UI_DESKTOP.MID2_H = 225;
        DRAW_FILL = true
    } else {
        MID_UI_DESKTOP.MID2_H = DRAW_MID_GRAPH ? 350 : 5
        // DRAW_FILL = !DRAW_MID_GRAPH
        DRAW_FILL = true
    }

    MID_UI_DESKTOP.MID1_H = W_HEIGHT - MID_UI_DESKTOP.TOP_H - MID_UI_DESKTOP.BOTTOM_H - MID_UI_DESKTOP.MID2_H - MID_UI_DESKTOP.PADDING_X * 5;
    // MID_UI_DESKTOP.MID1_H = 50

    MID_UI_DESKTOP.ALL_W = W_WIDTH - MID_UI_DESKTOP.PADDING_X * 2;
    stroke('rgba(255, 255,255, 0.5)')
    // rect(PADDING_X, PADDING_Y, ALL_W, TOP_H, RADIUS )
    rect(MID_UI_DESKTOP.PADDING_X, MID_UI_DESKTOP.PADDING_Y * 2 + MID_UI_DESKTOP.TOP_H, MID_UI_DESKTOP.ALL_W, MID_UI_DESKTOP.MID1_H, MID_UI_DESKTOP.RADIUS)
    if (DRAW_FILL) fill('rgba(255,255,255,0.02)')
    rect(MID_UI_DESKTOP.PADDING_X, MID_UI_DESKTOP.PADDING_Y * 3 + MID_UI_DESKTOP.TOP_H + MID_UI_DESKTOP.MID1_H, MID_UI_DESKTOP.ALL_W, MID_UI_DESKTOP.MID2_H, MID_UI_DESKTOP.RADIUS)

    rect(MID_UI_DESKTOP.PADDING_X, MID_UI_DESKTOP.PADDING_Y * 4 + MID_UI_DESKTOP.TOP_H + MID_UI_DESKTOP.MID1_H + MID_UI_DESKTOP.MID2_H, MID_UI_DESKTOP.ALL_W, MID_UI_DESKTOP.BOTTOM_H, MID_UI_DESKTOP.RADIUS)
    noFill()
}

function drawUIMobile() {
    // MID_UI_MOBILE.MID_FLAG = SCENE === mid;
    // let DRAW_FILL;
    // MID_UI_MOBILE.RADIUS = 5;
    // MID_UI_MOBILE.PADDING_X = 5;
    // MID_UI_MOBILE.PADDING_Y = 5;
    // MID_UI_MOBILE.TOP_H = 80;
    // MID_UI_MOBILE.BOTTOM_H = 50;


    // // if (SCENE === intro) {
    // //     MID2_H = 340;
    // //     DRAW_FILL = true
    // // } else {
    // //     MID2_H = DRAW_MID_GRAPH ? 350 : 5
    // //     // DRAW_FILL = !DRAW_MID_GRAPH
    // //     DRAW_FILL = true
    // // }

    // // MID2 VA CALCOLATO

    // MID_UI_MOBILE.MID1_H = MID_UI_MOBILE.MID_FLAG ? 0 : 70
    // MID_UI_MOBILE.MID2_H = W_HEIGHT - MID_UI_MOBILE.TOP_H - MID_UI_MOBILE.BOTTOM_H - MID_UI_MOBILE.MID1_H - MID_UI_MOBILE.PADDING_X * 5;

    // MID_UI_MOBILE.ALL_W = W_WIDTH - MID_UI_MOBILE.PADDING_X * 2;

    stroke('rgba(255, 255,255, 0.5)')
    // rect(PADDING_X, PADDING_Y, ALL_W, TOP_H, RADIUS )
    if (!MID_UI_MOBILE.MID_FLAG) rect(MID_UI_MOBILE.PADDING_X, MID_UI_MOBILE.PADDING_Y * 2 + MID_UI_MOBILE.TOP_H, MID_UI_MOBILE.ALL_W, MID_UI_MOBILE.MID1_H, MID_UI_MOBILE.RADIUS)
    // if (DRAW_MID_GRAPH) fill('rgba(11,30,99,0.4)')
    rect(MID_UI_MOBILE.PADDING_X, MID_UI_MOBILE.PADDING_Y * 3 + MID_UI_MOBILE.TOP_H + MID_UI_MOBILE.MID1_H, MID_UI_MOBILE.ALL_W, MID_UI_MOBILE.MID2_H, MID_UI_MOBILE.RADIUS)
    noFill()
    rect(MID_UI_MOBILE.PADDING_X, MID_UI_MOBILE.PADDING_Y * 4 + MID_UI_MOBILE.TOP_H + MID_UI_MOBILE.MID1_H + MID_UI_MOBILE.MID2_H, MID_UI_MOBILE.ALL_W, MID_UI_MOBILE.BOTTOM_H, MID_UI_MOBILE.RADIUS)

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
    line(UI.graphUI.indicator.end, UI.graphUI.line.y.bottom, W_WIDTH - UI.paddingGraphLine, UI.graphUI.line.y.bottom)
    line(UI.graphUI.indicator.end, UI.graphUI.line.y.mid, W_WIDTH - UI.paddingGraphLine, UI.graphUI.line.y.mid)
    line(UI.graphUI.indicator.end, UI.graphUI.line.y.high, W_WIDTH - UI.paddingGraphLine, UI.graphUI.line.y.high)
}

function setUIMobilePos() {
    MID_UI_MOBILE.MID_FLAG = SCENE === mid;
    MID_UI_MOBILE.RADIUS = 5;
    MID_UI_MOBILE.PADDING_X = 5;
    MID_UI_MOBILE.PADDING_Y = 5;
    MID_UI_MOBILE.TOP_H = 80;
    MID_UI_MOBILE.BOTTOM_H = 50;

    MID_UI_MOBILE.MID1_H = MID_UI_MOBILE.MID_FLAG ? 0 : 70
    MID_UI_MOBILE.MID2_H = W_HEIGHT - MID_UI_MOBILE.TOP_H - MID_UI_MOBILE.BOTTOM_H - MID_UI_MOBILE.MID1_H - MID_UI_MOBILE.PADDING_X * 5;

    MID_UI_MOBILE.ALL_W = W_WIDTH - MID_UI_MOBILE.PADDING_X * 2;
}


function setIntroPositions() {
    if (GLOBALSTART) {
        const terminal = document.getElementsByClassName("terminal")[0];
        terminal.style.opacity = '1';
    }
    if (ismobile) {
        setUIMobilePos();
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
                bottom: W_HEIGHT - 100,
                mid: W_HEIGHT - 175,
                high: W_HEIGHT - 250,
            }
        };

        UI.paddingGraphLine = 25;
        UI.paddingGraphText = 16

        //  calcolo posizione ellisse
        const blockHeight = MID_UI_MOBILE.PADDING_Y * 3 + MID_UI_MOBILE.TOP_H + MID_UI_MOBILE.MID1_H;
        const availableSpace = UI.graphUI.line.y.high - blockHeight;
        const ellipseHeight = 200;

        UI.ellipse = {
            draw: false,
            x: W_WIDTH / 2,
            y: blockHeight + availableSpace / 2,
        };


        // UI.ellipse = {
        //     x: W_WIDTH / 2,
        //     // y: W_WIDTH < 380 ? W_HEIGHT - 175 - 70 : W_HEIGHT - 175 - 80,
        //     y: (MID_UI_MOBILE.PADDING_Y *3) + MID_UI_MOBILE.TOP_H + MID_UI_MOBILE.MID1_H + 60,
        // };

        // UI.volstring = {
        //     x: W_WIDTH - 35,
        //     y: UI.ellipse.y + 50,
        // }

        // UI.sampleNo = {
        //     x: 12,
        //     y: UI.ellipse.y - 50,
        UI.volstring = {
            // x: (W_WIDTH / 2) + 100,
            // y: (W_HEIGHT / 2) + 75,
            x: (W_WIDTH / 2) + 100,
            y: (UI.ellipse.y) + 50,
        }

        UI.sampleNo = {
            x: (W_WIDTH / 2) - 100,
            y: (UI.ellipse.y) - 50,
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
                bottom: W_HEIGHT - 125,
                mid: W_HEIGHT - 200,
                high: W_HEIGHT - 275,
            }
        };

        UI.paddingGraphLine = 25;
        UI.paddingGraphText = 16
        UI.ellipse = {
            x: 125,
            y: W_HEIGHT - 200,
        };

        UI.volstring = {
            x: 20,
            y: W_HEIGHT - 125,
        }

        UI.sampleNo = {
            x: 20,
            y: W_HEIGHT - 275,
        }

        if (START) drawUIDesktop()
    }

    if (Object.keys(BUTTONS).length ) {
        Object.values(BUTTONS).forEach(btn => btn.hide())
        
        if (GLOBALSTART){
            BUTTONS.pauseButton.show();
            BUTTONS.muteButton.show();
            if (REPLAYED) BUTTONS.skipButton.show();
        }
    }
}

function setMidPositions() {
    const terminal = document.getElementsByClassName("terminal")[0];
    terminal.style.display = 'none';
    if (ismobile) {
        setUIMobilePos();
        UI.graphStartX = 10;
        UI.graphUI = {};
        UI.graphUI.indicator = {
            start: 25 + UI.graphStartX,
            end: 30 + UI.graphStartX,
        };

        UI.graphUI.line = {
            x: UI.graphUI.indicator.end + 10,
            y: {
                bottom: W_HEIGHT > 900 ? W_HEIGHT - 160 : W_HEIGHT - 100,
                mid: W_HEIGHT > 900 ? W_HEIGHT - 280 : W_HEIGHT - 220,
                high: W_HEIGHT > 900 ? W_HEIGHT - 385 : W_HEIGHT - 325,
            }
        };
        UI.graphEndX = W_WIDTH - UI.graphUI.indicator.end
        UI.paddingGraphLine = 25;
        UI.paddingGraphText = 16


        //  calcolo posizione ellisse
        const blockHeight = MID_UI_MOBILE.PADDING_Y * 3 + MID_UI_MOBILE.TOP_H + MID_UI_MOBILE.MID1_H;
        const availableSpace = DRAW_MID_GRAPH ? UI.graphUI.line.y.high - blockHeight : MID_UI_MOBILE.MID2_H;
        const ellipseHeight = 200;

        UI.ellipse = {
            draw: false,
            x: W_WIDTH / 2,
            y: blockHeight + availableSpace / 2,
        };

        if (availableSpace >= ellipseHeight) UI.ellipse.draw = true

    } else {
        drawUIDesktop()
        UI.graphStartX = 10;
        UI.graphUI = {};
        UI.graphUI.indicator = {
            start: 25 + UI.graphStartX,
            end: 30 + UI.graphStartX,
        };

        UI.graphUI.line = {
            x: UI.graphUI.indicator.end + 10,
            y: {
                bottom: W_HEIGHT - 160,
                mid: W_HEIGHT - 280,
                high: W_HEIGHT - 385,
            }
        };
        UI.graphEndX = W_WIDTH - UI.graphUI.indicator.end
        UI.paddingGraphLine = 25;
        UI.paddingGraphText = 16

        //  calcolo posizione ellisse
        const blockHeight = MID_UI_DESKTOP.PADDING_Y * 2 + MID_UI_DESKTOP.TOP_H;
        const availableSpace = MID_UI_DESKTOP.MID1_H;//DRAW_MID_GRAPH ? UI.graphUI.line.y.high - blockHeight : MID_UI_DESKTOP.MID1_H;
        const ellipseHeight = 150;

        UI.ellipse = {
            x: W_WIDTH / 2,
            // y: W_HEIGHT / 2,
            y: blockHeight + availableSpace / 2,
        };
        UI.ellipse.draw = ellipseHeight > availableSpace ? false : true;

    }


    UI.volstring = {
        // x: (W_WIDTH / 2) + 100,
        // y: (W_HEIGHT / 2) + 75,
        x: (W_WIDTH / 2) + 100,
        y: (UI.ellipse.y) + 75,
    }

    UI.sampleNo = {
        x: (W_WIDTH / 2) - 100,
        y: (UI.ellipse.y) - 75,
    }

    if (Object.keys(BUTTONS).length) {
        Object.values(BUTTONS).forEach(btn => btn.hide())
        BUTTONS.toggleButton.show();
        BUTTONS.pauseButton.show();
        BUTTONS.muteButton.show();
        if (REPLAYED) BUTTONS.skipButton.show();
    }

}

function setEndPositions() {
    const terminal = document.getElementsByClassName("terminal")[0];
    terminal.style.opacity = '1';
    if (ismobile) {
        setUIMobilePos();
        UI.graphStartX = 10;
        UI.graphUI = {};
        UI.graphUI.indicator = {
            start: 25 + UI.graphStartX,
            end: 30 + UI.graphStartX,
        };

        UI.graphUI.line = {
            x: UI.graphUI.indicator.end + 10,
            y: {
                bottom: W_HEIGHT > 900 ? W_HEIGHT - 160 : W_HEIGHT - 100,
                mid: W_HEIGHT > 900 ? W_HEIGHT - 280 : W_HEIGHT - 220,
                high: W_HEIGHT > 900 ? W_HEIGHT - 385 : W_HEIGHT - 325,
            }
        };
        UI.graphEndX = W_WIDTH - UI.graphUI.indicator.end
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
                bottom: W_HEIGHT - 160,
                mid: W_HEIGHT - 280,
                high: W_HEIGHT - 385,
            }
        };
        UI.graphEndX = W_WIDTH - UI.graphUI.indicator.end
        UI.paddingGraphLine = 25;
        UI.paddingGraphText = 16
        drawUIDesktop()
    }

    Object.values(BUTTONS).forEach(btn => btn.hide())

    // BUTTONS.pauseButton.show();
    BUTTONS.muteButton.show();
    BUTTONS.exitButton.show();
    BUTTONS.replayButton.show();

    BUTTONS.aButton.show();
    BUTTONS.bButton.show();
    BUTTONS.cButton.show();
    BUTTONS.dButton.show();
    BUTTONS.eButton.show();

    drawGraphUI();
    drawAudioGraphAverage()

}

// draws the live audiograph for mid section
function drawAudioGraphLive(points, cb) {
    const OFFSET = ismobile ? 75 : 135;
    push();
    beginShape();
    for (var i = 0; i < points.length; i++) {
        // var y = map(points[i], 0, 1, height - 25, height - 500) - OFFSET;

        var y = map(points[i], 0, 0.5, UI.graphUI.line.y.bottom, UI.graphUI.line.y.high);
        vertex((i * 4) + UI.graphUI.line.x, y);
    }
    endShape();
    pop();

    if (cb) cb();
}

// draws average graph
function drawAudioGraphAverage() {
    const END = SCENE === end ? 'averageEnd' : 'average';
    const OFFSET = ismobile ? 0 : 100;//height > 600 ? 100 : 0;

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
            xoff += 0.07
            let noiseVal = noise(xoff);
            // var y = average - (OFFSET + 5 * index) - (100 * noiseVal); // 300 mobile
            // var y = average - (5 * index) - (100 * noiseVal); // 300 mobile
            var y = average - (50 * noiseVal); // 300 mobile
            vertex(i * 4 + UI.graphUI.indicator.end, y);
        }
        endShape();
        pop();
    })

}

function setCSS() {
    // const CSS_LOGO = {
    //     mobile: 'z-index: 999999; top: 20px; left: 10px; width: 50px; position: absolute;',
    //     desktop: 'z-index: 999999; top: 20px; left: 20px; width: 300px; position: absolute;',
    // }

    const CSS_LOGO = {
        mobile: 'width=100px',
        desktop: 'width=150px',
    }

    const CSS_TERMINAL = {
        mobile: 'position: absolute; top: 80px; right: 0; bottom: 0; left: 0px; width: 100%; margin-left: 0%; margin-right: 0%; overflow-y: auto;',
        desktop: 'position: absolute; top: 150px; right: 0; bottom: 0; left: 10px; overflow-y: auto;',

    }
    const terminal = document.getElementsByClassName("terminal")[0];
    terminal.style = ismobile ? CSS_TERMINAL.mobile : CSS_TERMINAL.desktop

    const logo = document.getElementById('bxt_img');
    logo.style = ismobile ? CSS_LOGO.mobile : CSS_LOGO.desktop;

}


function toggleOverlay(year) {
    OVERLAYS.all.forEach(ovr => {
        if (ovr.id === year) {
            if (ovr.style.display === 'none' || !ovr.style.display) ovr.style.display = 'block';
            else ovr.style.display = 'none'
        }
        else ovr.style.display = 'none'
    })
}

function overlay2010() {
    toggleOverlay('2010')
}

function overlay2011() {
    toggleOverlay('2011')
}

function overlay2012() {
    toggleOverlay('2012')
}

function overlay2013() {
    toggleOverlay('2013')
}

function overlay2014() {
    toggleOverlay('2014')
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

function startIntro() {
    START = true;
    GLOBALSTART = true;

    AUDIO.gladosEnd.stop();
    AUDIO.glados.play();
    AUDIO.glados.onended(continueMid);
    AUDIO.song.play();
    AUDIO.song.onended(replaySong);

    CURR_AUDIO_PLAYING = [AUDIO.glados, AUDIO.song];
    document.getElementById('welcome-message').style.visibility = 'hidden';
    document.getElementById('start_btn').style.visibility = 'hidden';

    Object.values(BUTTONS).forEach(btn => btn.hide())
    BUTTONS.pauseButton.show();
    BUTTONS.muteButton.show();
    if (REPLAYED) BUTTONS.skipButton.show();

    NEXTSCENE = startMid;
}


// starts MID section
function startMid() {
    AUDIO.glados.onended(() => { });
    AUDIO.glados.stop();

    // if (ismobile) {
    //     document.getElementById('bxt').style.left = '50%';
    //     document.getElementById('bxt').style["margin-left"] = '-75px';
    // }

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
    AUDIO.gladosGraph.onended(() => { });
    AUDIO.gladosGraph.stop();
    AUDIO.moviesGraph.stop();

    DRAW_MID_GRAPH = true;
    // moving logo back
    // document.getElementById('bxt').style.left = '20px';
    // document.getElementById('bxt').style["margin-left"] = '0px';

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

    // BUTTONS.pauseButton.show();
    BUTTONS.muteButton.show();
    BUTTONS.exitButton.show();
    BUTTONS.replayButton.show();
    BUTTONS.aButton.show();
    BUTTONS.bButton.show();
    BUTTONS.cButton.show();
    BUTTONS.dButton.show();
    BUTTONS.eButton.show();
    // if (REPLAYED) BUTTONS.skipButton.show();
    console.log(' #### > starting end section')
}


// this draws the intro section
function intro() {
    // clear();
    drawGraphUI();
    vol = amp.getLevel();
    volhistory.push(vol);
    sampleNo += 1;
    stroke(255);
    noFill();
    push();
    const minHeight = ismobile ? 100 : 125
    beginShape();
    for (var i = 0; i < volhistory.length; i++) {
        var y = map(volhistory[i], 0, 1, W_HEIGHT - minHeight, W_HEIGHT - 550);
        vertex((i * 4) + UI.graphUI.line.x, y);
    }
    endShape();
    pop();

    if (volhistory.length * 4 > (W_WIDTH) - 50 - UI.graphUI.line.x) {
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
    // clear();
    sampleNo++;
    MID.curr = amp.getLevel();


    // this sucks
    // console.log(MID.curr, MID.wasPaused)
    if (MID.curr === 0 && MID.wasPaused) MID.changeYear = false;
    if (MID.curr > 0 && MID.wasPaused) {
        MID.wasPaused = false;
        MID.changeYear = true
    }



    // change year
    if (MID.prev > 0 && MID.curr === 0 && MID.changeYear) {
        // change points bucket
        MID.index++
        if (MID.index === MID.yearList.length) {
            graphData[MID.year].points.normalized = normalizePoints(graphData[MID.year].points.raw)
            graphData[MID.year].points.average = arrAvg(graphData[MID.year].points.normalized);
            graphData[MID.year].points.averageEnd = graphData[MID.year].points.average
            graphData[MID.year].points.window = [];
            MID.prev = 0;
            return;
        }

        // console.log(' #### >> fetched points: ', graphData[MID.year].points.raw)

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
    if (graphData[MID.year].points.window.length * 4 > (W_WIDTH) - 50 - UI.graphUI.line.x) { // width
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

    stroke('rgb(255,255,255');
    if (UI.ellipse.draw) {
        // resetting stroke color
        stroke('rgba(0,255,255, 0.1');

        // drawing mouth
        ellipse(UI.ellipse.x, UI.ellipse.y, 200, (MID.curr || voiceAmp.getLevel()) * 200);
        textFont('monospace');
        textSize(8);

        // drawing framecount and vol value
        let volstring = MID.curr.toString()
        text(volstring.substring(0, 4), UI.volstring.x, UI.volstring.y);
        text(sampleNo, UI.sampleNo.x, UI.sampleNo.y);
    }
    // storing curr value for checking year change
    MID.prev = MID.curr;
}

// this handle the END section
function end() {
    // clear();
    drawGraphUI();
    drawAudioGraphAverage()

    // document.getElementById('restart').style.visibility = 'visible';
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


function setWH() {
    W_WIDTH = ismobile ? width : windowWidth;
    W_HEIGHT = ismobile ? height : windowHeight;
    ismobile = window.matchMedia("only screen and (max-width: 760px)").matches || width <= 760;

    if (ismobile) window.postMessage('TRIM', '*')
    else window.postMessage('UNTRIM', '*')
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

    // double check. 
    ismobile = ismobile || width <= 760;
    setWH()
    if (ismobile) window.postMessage('TRIM', '*')

    amp = new p5.Amplitude();
    amp.setInput(AUDIO.glados);
    setIntroPositions();
    SCENE = intro;
    SCENEPOS = setIntroPositions;

    const BUTTON_STYLE = ismobile ? BUTTON_STYLE_MOBILE : BUTTON_STYLE_DESKTOP;
    const BUTTON_STYLE_2010 = ismobile ? BUTTON_STYLE_2010_MOBILE : BUTTON_STYLE_2010_DESKTOP;
    const BUTTON_STYLE_2011 = ismobile ? BUTTON_STYLE_2011_MOBILE : BUTTON_STYLE_2011_DESKTOP;
    const BUTTON_STYLE_2012 = ismobile ? BUTTON_STYLE_2012_MOBILE : BUTTON_STYLE_2012_DESKTOP;
    const BUTTON_STYLE_2013 = ismobile ? BUTTON_STYLE_2013_MOBILE : BUTTON_STYLE_2013_DESKTOP;
    const BUTTON_STYLE_2014 = ismobile ? BUTTON_STYLE_2014_MOBILE : BUTTON_STYLE_2014_DESKTOP;

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


    BUTTONS.aButton = createButton('2010');
    BUTTONS.aButton.style(BUTTON_STYLE_2010)
    BUTTONS.aButton.mousePressed(overlay2010);

    BUTTONS.bButton = createButton('2011');
    BUTTONS.bButton.style(BUTTON_STYLE_2011)
    BUTTONS.bButton.mousePressed(overlay2011);

    BUTTONS.cButton = createButton('2012');
    BUTTONS.cButton.style(BUTTON_STYLE_2012)
    BUTTONS.cButton.mousePressed(overlay2012);

    BUTTONS.dButton = createButton('2013');
    BUTTONS.dButton.style(BUTTON_STYLE_2013)
    BUTTONS.dButton.mousePressed(overlay2013);

    BUTTONS.eButton = createButton('2014');
    BUTTONS.eButton.style(BUTTON_STYLE_2014)
    BUTTONS.eButton.mousePressed(overlay2014);

    setBTNPosition = ismobile ? setBTNPositionMobile : setBTNPositionDesktop;

    setBTNPosition();
    Object.values(BUTTONS).forEach(btn => btn.hide())

    OVERLAYS.all = Array.from(document.getElementsByClassName("overlay"));

    OVERLAYS.all.forEach(overlay => {
        OVERLAYS[overlay.id] = overlay;
    })

    console.log('################################################################');
    console.log('\n\nWARNING! every bug in this code is totally there on purpose.');
    console.log(`༼つʘ益ʘ༽つ ░\n\n`);
    console.log('################################################################');
}

function draw() {
    if (!START) return;
    clear();

    if (ismobile) drawUIMobile()
    else drawUIDesktop()


    SCENE();


    if (DEBUG) text(`sDEBUG: width: ${width} / height: ${height} / ismobile: ${ismobile} / ww: ${W_WIDTH} / wh: ${W_HEIGHT}`, 10, 10);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    setWH()
    setBTNPosition = ismobile ? setBTNPositionMobile : setBTNPositionDesktop;
    setCSS();
    setBTNPosition()
    if (GLOBALSTART) {
        if (ismobile) drawUIMobile()
        else drawUIDesktop()
        SCENEPOS();
        SCENE();
    
    } else {
        if (Object.keys(BUTTONS).length) {
            Object.values(BUTTONS).forEach(btn => btn.hide())
        }
    }
}