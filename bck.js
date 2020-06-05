jQuery(document).ready(function($) {
    var id = 1;
    $('body').terminal(function(command, term) {
        if (command.toLowerCase() == 'help') {
            term.echo(`
 current available commands are:
  \`music\`     : shows my work as a musician
  \`dev\`       : container for my dev projects
  \`cv\`        : it displays my cv
  \`contacts\`  : list of places where you can find me 
`);
        } 

        else if (command.toLowerCase() == "music") {
          term.echo(`
 i made tunes and play drums, find out more at:
  - http://6160.bandcamp.com
  - http://facebook.com/sixonesixo
  - http://soundcloud.com/6160
 this is the video for one of the songs, generated using Processing, Ableton Live and OSC:
  - https://www.youtube.com/watch?v=hJhB0FU7UV8
 i've also made a couple of records with Lamantide:
  - http://lamantide.bandcamp.com
  - http://facebook.com/lamantidehc
`);
        }
        else if (command.toLowerCase() == "dev") {
          term.echo(`
 those are a couple of things i've made:
  - processing source code i've used to generate the video of "Manico" (from my EP):
    https://github.com/6160/knifeEP-video
  - processing source code for "knife" Artwork:
    https://github.com/6160/knifeEP-cover
  `);
        } else if (command.toLowerCase() == "cv") {
          term.echo(`
 personal data:
­  - Date of birth: October 21st 1987.
­  - Nationality: Italian.
­  - Gender: Male.
 studying experiences:
­  - High school diploma in Electronic and Telecommunications.
­  - 3 years of Computer Science Engineering.
­  - Apple Certified Logic Pro X 10.1
­  - BTEC Extended Diploma in Music.
 knowledge:
­  - Python as a main programming language.
­  - MySQL, Processing, p5.js, Javascript.
­  - Confident using Windows, Mac and Linux OS.
­  - I use Ableton Live and Logic Pro X for creating music.
­  - Fluent english comprehension.
 working experiences:
  - Python full stack developer and analyst for Max Mara Fashion Group. 
  - Junior QA, Developer and Tier 2 technical support operator 
      at Expert System S.p.A. (http://www.expertsystem.it) 
  - Content manager on Virgilio Genio platform (http://www.virgilio.it)
      for Imille S.R.L company.
  - Web developer for clothing company Deadmeat (http://www.deadmeat.it)
­  - IT member at Chamber of Commerce in Modena (http://www.mo.camcom.it)
 
 more at http://www.linkedin.com/in/marco-vinesi
`);
        } else if (command.toLowerCase() == "contacts") {
          term.echo(`
 contact me at:
  - marco@sixonesixo.com
  - http://twitter.com/sixonesixo
  - http://www.linkedin.com/in/marco-vinesi
:)
`);
        } else {
            term.echo("unknow command: " + command + "\n");
        }
    }, {
        greetings: "connected to sixonesixo.com\n\n██╗  ██╗███████╗██╗     ██╗      ██████╗   \n██║  ██║██╔════╝██║     ██║     ██╔═══██╗  \n███████║█████╗  ██║     ██║     ██║   ██║  \n██╔══██║██╔══╝  ██║     ██║     ██║   ██║  \n██║  ██║███████╗███████╗███████╗╚██████╔╝  \n╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝   \n\ni'm marco, a freelance full stack developer and musician.\nREMEMBER: this is an early version, if you're on mobile it *might* behave weirdly.\n\ntype `help` for available commands.\n",
        onBlur: function() {
            // prevent loosing focus
            return false;
        }
    });
});