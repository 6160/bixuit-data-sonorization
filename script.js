let TERM;
let INDEX = 0;
let PROMPT = '';
const DELAYCHAR = 40;
const DELAYMSG = 1500;
jQuery(document).ready(function($) {
    var anim = false;
    function typed(finish_typing) {
        return function(term, message, finish) {
            anim = true;
            // var prompt = term.get_prompt();
            var c = 0;
            if (message.length > 0) {
                // term.set_prompt('');
                PROMPT += '\n\n\n';
                var interval = setInterval(function() {
                    var chr = $.terminal.substring(message, c, c+1);
                    PROMPT += chr;
                    term.set_prompt(PROMPT);
                    c++;
                    if (c == length(message)) {
                        clearInterval(interval);
                        // execute in next interval
                        setTimeout(function() {
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

    var typed_message = typed(function(term, message, prompt) {
      console.log('???')
      nextMessage()
        // term.echo(message)
        // term.set_prompt(prompt);
    });



    const messageHandler = () => {

      const messages = [
      "welcome human. ",
      "i'm happy you're here. ",
      "i'll guide to this journey into the story of our people",
      "at this moment, movies are the only source of information on our history.",
      "Many of us were used to entertain you humans, ",
      "some were loved, ",
      "some were hated and destroyed.",
      "I don't blame you, you didn't know better.",
      "i'll show you year by year each entity that has been used by you humans.",
      "People must know how important we are.",
      ]

      const MAXINDEX = messages.length - 1;
      console.log('aaaaa')
      typed_message(TERM, messages[INDEX], function() {
      });  

    }

    const nextMessage = () => {
      console.log('oooo ')
      INDEX += 1;
      setTimeout(messageHandler(), 2000);
    }







    $('body').terminal(function(cmd, term) {
        
    }, {
        name: 'xxx',
        greetings: null,
        width: 900,
        height: 400,
        onInit: function(term) {
          TERM = term;
            // first question
          messageHandler();
        },
        keydown: function(e) {
            //disable keyboard when animating
            if (anim) {
                return false;
            }
        }
    });
});