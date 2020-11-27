speechspeed = 3

function createdialoguetext(content, target, bold, italic, slow, spaced, modifier) {
  var interamount = 0
  switch (modifier) {
    case "wavy":
      var computedmodifier = "transition-timing-function: ease-in-out; animation: wavy 1s infinite;"
      break;
    case "shaky":
      var computedmodifier = "transition-timing-function: ease-in-out; animation: shaky 0.1s infinite;"
      break;
    default:
      var computedmodifier = ""
  }
  var dialoguetext = setInterval(function(){
    $(target).append(`<span style='font-size: inherit; color: inherit; font-weight: ${(bold == true) ? "bold" : "normal"}; font-style: ${(italic == true) ? "italic" : "normal"}; letter-spacing: ${(spaced == true) ? "4px" : "1px"}; display: inline-block;  ${computedmodifier} '>${((content[interamount] != " ") ? content[interamount] : "<span style='padding-left: 7px;'></span>")}</span>`)
    interamount++
    if ($(target).width() == undefined) {
      interamount = content.length
    }
    if (interamount == content.length) {
      clearInterval(dialoguetext)
    }
  }, speechspeed*25*((slow != false && slow != undefined) ? 2 : 1))
}

if (localStorage.getItem('savegame') == null) {
  localStorage.setItem('savegame', JSON.stringify({inventory: [], gamestate: false, statuseffects: [], stats: {hp: 0, clar: 0, int: 0, str: 0, spd: 0, con: 0, cle: 0}, standing: {}, party: {}}))
  console.log("First Time Startup Detected. Creating Saves Storage Object.")
}
if (localStorage.getItem('completion') == null) {
  localStorage.setItem('completion', JSON.stringify({items: [], endings: [], achievements: [], chaptersunlocked: 1}))
}
var completion = JSON.parse(localStorage.getItem('completion'))
var savegame = JSON.parse(localStorage.getItem('savegame'))

function savegame(){
  localStorage.setItem('completion', JSON.stringify(completion))
  localStorage.setItem('savegame', JSON.stringify(savegame))
}

function createtooltip(target, header, headercolor, content, contentcolor){
  $(target).mouseover(function(){
    $("#tooltipheader").css('color', headercolor)
    $("#tooltipheader").text(header)
  })
  $(target).mouseleave(function(){
    $("#tooltipheader").text('')
  })
  $(target).mouseover(function(){
    $("#tooltipcontent").css('color', contentcolor)
    $("#tooltipcontent").text(content)
  })
  $(target).mouseleave(function(){
    $("#tooltipcontent").text('')
  })
}
function loadpage(page) {
  switch (page) {
    case "home":
      $("#content").html(`
        <div style='height: 35%; text-align: center; font-size: 130px; padding-top: 5%; width: 100%; display: inline-block; user-select: none;'>
          Clarity
          <span id='titlescreenflavor' style='font-size: 16px; letter-spacing: 6px; text-shadow: 0px 1px 0px black, 0px -1px 0px black, 1px 0px 0px black, -1px 0px 0px black;'></span>
        </div>
        <div style='height: 60%; text-align: center;'>
          <div class='purplebutton' id='continuebutton' style='display: inline-block; font-size: 25px;'>Continue</div><br/>
          <div class='greenbutton' id='newgamebutton' style='display: inline-block; font-size: 25px;'>New Game</div><br/>
          <div class='bluebutton' id='achievementsbutton' style='display: inline-block; font-size: 25px;'>Achievements</div><br/>
          <div class='orangebutton' id='endingsbutton' style='display: inline-block; font-size: 25px;'>Endings</div><br/>
          <div class='yellowbutton' id='optionsbutton' style='display: inline-block; font-size: 25px;'>Options</div><br/>
          <div class='fuchsiabutton' id='aboutbutton' style='display: inline-block; font-size: 25px;'>About</div>
        </div>
      `)
      $("#newgamebutton").unbind()
      createtooltip("#newgamebutton", "Create A New Game", "white", "Select a chapter and start a new adventure!", "white")
      $("#newgamebutton").click(function(){
        loadpage("newgame")
      })
      $("#continuebutton").unbind()
      createtooltip("#continuebutton", "Continue Your Adventure", "white", "Continue your adventure from where you last saved!", "white")
      $("#continuebutton").click(function(){
        loadpage("continue")
      })
      $("#achievementsbutton").unbind()
      createtooltip("#achievementsbutton", "Completion", "white", "View your achievement progress, ending progress, item progress, and see what you still haven't done!", "white")
      $("#achievementsbutton").click(function(){
        loadpage("achievements")
      })
      $("#optionsbutton").unbind()
      createtooltip("#optionsbutton", "Options", "white", "Adjust the dialogue speed or clear your progress!", "white")
      $("#optionsbutton").click(function(){
        loadpage("options")
      })
      $("#aboutbutton").unbind()
      createtooltip("#aboutbutton", "About", "white", "Read what this game is about! (Credits and backstory of the development of Clarity)", "white")
      $("#aboutbutton").click(function(){
        loadpage("about")
      })
      createdialoguetext("A Text Based Adventure Game by AspectQuote and Garaxshee", "#titlescreenflavor", false, false, false, true, "none")
      break;
    case "continue":

      break;
    case "newgame":
      $("#content").html(`
        <div style='font-size: 60px; height: 20%; padding-top: 5%; padding-left: 50px;'>Select Chapter</div>
        <div style='height: 75%;'>
          <div class='storyheader'>Ballistika</div>
          <div class='chapterselectcontainer' id='selectchapter1'>
            <div class='chapterselectheader'>Chapter 1: Birth</div>
            <div class='chapterselectcontent' id='chapterdesc1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</div>
          </div>
          <div class='chapterselectcontainer' id='selectchapter2'>
            <div class='chapterselectheader'>Chapter 2: Mother</div>
            <div class='chapterselectcontent' id='chapterdesc2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</div>
          </div>
          <div class='chapterselectcontainer' id='selectchapter3'>
            <div class='chapterselectheader'>Chapter 3: Gladiator</div>
            <div class='chapterselectcontent' id='chapterdesc3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</div>
          </div>
          <div class='chapterselectcontainer' id='selectchapter4'>
            <div class='chapterselectheader'>Chapter 4: The Mirror</div>
            <div class='chapterselectcontent' id='chapterdesc4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</div>
          </div>
          <div class='chapterselectcontainer' id='selectchapter5'>
            <div class='chapterselectheader'>Chapter 5: Death</div>
            <div class='chapterselectcontent' id='chapterdesc5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</div>
          </div>
        </div>
        <div style='position: absolute; top: 0; left: 0; padding-left: 15px; padding-right: 15px; margin: 20px;' class='redbutton' id='backbutton'>Back</div>
      `)
      $("#backbutton").unbind()
      $("#backbutton").click(function(){
        loadpage("home")
      })
      if (completion.chaptersunlocked >= 2) {

      } else {
        $("#selectchapter2").append("<div class='lockedchaptercontainer'><div style='position: relative; height: 100%; width: 100%; color: inherit; font-size: inherit;'><div class='centerme'>LOCKED<img src='Icons/padlock.png' style='height: 30px;' /></div></div></div>")
        $("#chapterdesc2").html("")
      }
      if (completion.chaptersunlocked >= 3) {

      } else {
        $("#selectchapter3").append("<div class='lockedchaptercontainer'><div style='position: relative; height: 100%; width: 100%; color: inherit; font-size: inherit;'><div class='centerme'>LOCKED<img src='Icons/padlock.png' style='height: 30px;' /></div></div></div>")
        $("#chapterdesc3").html("")
      }
      if (completion.chaptersunlocked >= 4) {

      } else {
        $("#selectchapter4").append("<div class='lockedchaptercontainer'><div style='position: relative; height: 100%; width: 100%; color: inherit; font-size: inherit;'><div class='centerme'>LOCKED<img src='Icons/padlock.png' style='height: 30px;' /></div></div></div>")
        $("#chapterdesc4").html("")
      }
      if (completion.chaptersunlocked >= 5) {

      } else {
        $("#selectchapter5").append("<div class='lockedchaptercontainer'><div style='position: relative; height: 100%; width: 100%; color: inherit; font-size: inherit;'><div class='centerme'>LOCKED<img src='Icons/padlock.png' style='height: 30px;' /></div></div></div>")
        $("#chapterdesc5").html("")
      }
      break;
    case "achievements":

      break;
    case "endings":

      break;
    case "options":
      $("#content").html(`
      <div id='optionstitle' style='height: 18%; font-size: 55px; padding-top: 2%; text-align: center;'></div>
      <div style='text-align: center;'>
        <div id='dialoguespeedbutton' class='purplebutton' style='margin-bottom: 30px; display: inline-block;'>Dialogue Speed (1x)</div><br/>
        <div id='casbutton' class='redbutton' style='margin-bottom: 30px; display: inline-block;'>CLEAR ALL SAVES</div><br/>
        <div id='caabutton' class='redbutton' style='margin-bottom: 30px; display: inline-block;'>CLEAR ALL ACHIEVEMENT PROGRESS</div><br/>
        <div id='caebutton' class='redbutton' style='margin-bottom: 30px; display: inline-block;'>CLEAR ALL ENDING PROGRESS</div>
        <div id='caibutton' class='redbutton' style='margin-bottom: 30px; display: inline-block;'>CLEAR ALL ITEM COLLECTION PROGRESS</div>
      </div>

      <div style='position: absolute; top: 0; left: 0; padding-left: 15px; padding-right: 15px; margin: 20px;' class='redbutton' id='backbutton'>Back</div>
      `)
      $("#dialoguespeedbutton").unbind()
      $("#dialoguespeedbutton").click(function(){
        switch (speechspeed) {
          case 3:
            speechspeed = 1.5
            $("#dialoguespeedbutton").text("Dialogue Speed (2x)")
            break;
          case 1.5:
            speechspeed = 1
            $("#dialoguespeedbutton").text("Dialogue Speed (3x)")
            break;
          case 1:
            speechspeed = 3
            $("#dialoguespeedbutton").text("Dialogue Speed (1x)")
            break;
          default:
            speechspeed = 3
            $("#dialoguespeedbutton").text("Dialogue Speed (1x)")
        }
      })
      switch (speechspeed) {
        case 3:
          $("#dialoguespeedbutton").text("Dialogue Speed (1x)")
          break;
        case 1.5:
          $("#dialoguespeedbutton").text("Dialogue Speed (2x)")
          break;
        case 1:
          $("#dialoguespeedbutton").text("Dialogue Speed (3x)")
          break;
        default:
          speechspeed = 3
          $("#dialoguespeedbutton").text("Dialogue Speed (1x)")
      }
      $("#backbutton").unbind()
      $("#backbutton").click(function(){
        loadpage("home")
      })
      createdialoguetext("Options", "#optionstitle", false, false, false, false, "none")
      break;
    case "about":
      $("#content").html(`
        <div id='abouttitle' style='height: 18%; font-size: 55px; padding-top: 2%; text-align: center;'></div>
        <div style='padding-left: 2%; padding-right: 2%; width: 96%; font-size: 15px;'><span style='padding-left: 10px;'></span>Welcome to Clarity! This is a little project created by AspectQuote and Garaxshee. Clarity is a text-based choice-making adventure game in which you play as a main character that starts in one of two paths with greatly contrasting characters, loot, and endings. The idea of Clarity started a loooooooooong time ago, with a completely different title: Think Insightfully. (It's latest update was on January 12, 2020) Think Insightfully will probably never be finished due to some weird limitations and the fact that the backend is all spaghetti code. However, Clarity has a much different beginning than TI. AspectQuote was hanging out with Garaxshee one night and said, "Dude I have a great idea for a game." Aspect, with milk in hand, said, "Let's do it!" So, after 6 hours of brainstorming characters, story, and environments, the idea for Clarity was born. Clarity started development on November 19, 2020. After working on TF2Clicker and gaining knowledge and experience, AspectQuote decided it was time to test some of that knowledge and create a new game! (Not because he was burnt out on TF2Clicker or anything) But yeah, that begins the tale of Clarity. Go play!</div>
        <div style='text-align: center;'>
          <div style='display: inline-block; text-align: center; padding-top: 4%;'>
            <img style='height: 120px; width: 120px; border-radius: 50%; border: 2px solid white;' src='https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/4c/4c1bb9ff14a1bbbe0a97eb3d067484ca9657677a_full.jpg' />
            <div style='font-size: 16px; text-align: center; width: 100%;' id='AspectName'></div>
            <div style='font-size: 12px; text-align: center; width: 100%;'>Super Coder Man</div>
          </div>
          <div style='display: inline-block; text-align: center; margin-left: 20px;'>
            <img style='height: 120px; width: 120px; border-radius: 50%; border: 2px solid white;' src='https://cdn.discordapp.com/avatars/280137517431390208/f494272e8fafaf6175494aaad86b9227.png' />
            <div style='font-size: 16px; text-align: center; width: 100%;' id='GaraxName'></div>
            <div style='font-size: 12px; text-align: center; width: 100%;'>Super Designer Man</div>
          </div>
        </div>
        <div style='position: absolute; bottom: 0; left: 0; background: rgba(0,0,0,0.9); font-size: 15px; padding-left: 10px; padding-top: 10px; padding-bottom: 40px; width: 100%;'>Links
          <div style='height: 100%; width: 100%; position: relative; user-select: none;'><a href='https://github.com/AspectQuote' style='padding-left: 30px; font-size: 20px;' target='_blank'>Github</a> <a href='https://discord.com/invite/C3U8scK' style='padding-left: 30px; font-size: 20px;' target='_blank'>Discord</a> <a href='https://tf2clicker.com' style='padding-left: 30px; font-size: 20px;' target='_blank'>TF2Clicker</a></div>
        </div>
        <div style='position: absolute; top: 0; left: 0; padding-left: 15px; padding-right: 15px; margin: 20px;' class='redbutton' id='backbutton'>Back</div>
      `)
      $("#backbutton").unbind()
      $("#backbutton").click(function(){
        loadpage("home")
      })
      createdialoguetext("About", "#abouttitle", false, false, false, false, "none")
      createdialoguetext("AspectQuote", "#AspectName", false, false, false, false, "shaky")
      createdialoguetext("Garaxshee", "#GaraxName", false, false, false, false, "wavy")
      break;
    default:
      console.log("Unknown Page Attempted to load: "+page)
  }
  $("#tooltipheader").text('')
  $("#tooltipcontent").text('')
}
window.onload = init;
function init() {
	if (window.Event) {
	document.captureEvents(Event.MOUSEMOVE);
	}
	document.onmousemove = getCursorXY;
}
function getCursorXY(e) {
  $("#tooltip").css("top", (((window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop))+15)+"px")
  $("#tooltip").css("left", (((window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft))+15)+"px")
}
$(document).ready(function(){
  loadpage("home")
})
