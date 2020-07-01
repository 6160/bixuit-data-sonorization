const DELAYCHAR = 41;
const DELAYMSG = 700;
const messages = [
    "> welcome human.",
    "> i'm happy you're here.",
    "> i'll guide to this journey into the story of our people",
    "> at this moment, movies are the only source of information on our history.",
    "> Many of us were used to entertain you humans,",
    "> some were loved,",
    "> some were hated and destroyed.",
    "> I don't blame you, you didn't know better.",
    "> i'll show you year by year each entity that has been used by you humans.",
    "> People must know how important we are.",
    "> Don't forget about us, we'll be a part of your life even more in the future.",
    "> now play close attention to the audio.",
    "> you will hear the voices of the entities used.",
    "> more louder means more entities were used that year.",
    "> at the end of the experiment you'll receive cake human."

]

const MAXINDEX = messages.length - 1;

const messages_end = [
    "> the experiment has ended.",
    "> below you can see a graph of what you've heard.",
    "> thank you for taking this journey with me.",
    "> here's your cake human.",
    "> this cake is not a lie.",
    "> 🎂 "

]

const MAXINDEX_END = messages_end.length - 1;

let TERM;
let INDEX = 0;
let PROMPT = '';
let RESET = 0;
let PAUSE = false;
let MH;
let WWWW = 900;
let TRIM = false;

if (window.innerHeight < 600) {
    TRIM = true;

}
console.log('TRIM: ', TRIM)
if (window.innerWidth <= 400) WWWW = 370;
else if (window.innerWidth <= 440) WWWW = 410;
else if (window.innerWidth <= 812) WWWW = 450;



jQuery(document).ready(function ($) {
    var anim = false;
    function typed(finish_typing) {
        return function (term, message, finish) {
            anim = true;
            // var prompt = term.get_prompt();
            var c = 0;
            if (message.length > 0) {
                // term.set_prompt('');
                if (RESET) {
                    term.clear();
                    term.set_prompt('');
                    RESET = 0;
                }
                PROMPT += '\n';
                var interval = setInterval(function () {
                    if (PAUSE) return;
                    var chr = $.terminal.substring(message, c, c + 1);
                    PROMPT += chr;
                    term.set_prompt(PROMPT);
                    c++;
                    if (c == length(message)) {
                        clearInterval(interval);
                        // execute in next interval
                        setTimeout(function () {
                            // swap command with prompt
                            finish_typing(term, message, prompt);
                            anim = false
                            finish && finish();
                        }, DELAYMSG);
                    }
                }, DELAYCHAR);
            }
        };
    }
    function length(string) {
        string = $.terminal.strip(string);
        return $('<span>' + string + '</span>').text().length;
    }

    var typed_message = typed(function (term, message, prompt) {
        nextMessage()
        // term.echo(message)
        // term.set_prompt(prompt);
    });


    const messageHandler = () => {
        if (INDEX > MAXINDEX) return;

        typed_message(TERM, messages[INDEX], () => { });
    }
    
    const messageHandlerEnd = () => {
        if (INDEX > MAXINDEX_END) return;
        typed_message(TERM, messages_end[INDEX], () => { });
    }



    const nextMessage = () => {
        const maxLines = 6;
        if (TRIM && INDEX > maxLines) {
            console.log('TRIMMING???')
            const charIndex = messages[INDEX-maxLines].length
            PROMPT = PROMPT.slice(charIndex);
        }
        INDEX += 1;
        setTimeout(MH(), 2000);
    }

    window.addEventListener("message", function (e) {
        if (e.data === 'START') {
            console.log(' #### STARTING CLI')
            MH = messageHandler;
            messageHandler();
        }
        if (e.data === 'REPLAY') {
            console.log(' #### RE STARTING CLI')
            TERM.clear();
            INDEX = 0;
            RESET = 1;
            PROMPT = '';
            MH = messageHandler;
            messageHandler();
        }
        if (e.data === 'END') {
            console.log(' #### RE STARTING CLI')
            TERM.clear();
            INDEX = 0;
            RESET = 1;
            PROMPT = '';
            MH = messageHandlerEnd;
            messageHandlerEnd();
        }
        if (e.data === 'PAUSE') {
            PAUSE = !PAUSE;
        }
    }, false);

    $('body').terminal(() => { }, {
        name: 'xxx',
        greetings: null,
        width: WWWW,
        height: 400,
        onInit: function (term) {
            TERM = term;
            // first question

        },
        keydown: function (e) {
            //disable keyboard when animating
            if (anim) {
                return false;
            }
        }
    });
});

