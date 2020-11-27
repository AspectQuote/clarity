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
  localStorage.setItem('savegame', JSON.stringify({inventory: [], gamestate: false, statuseffects: [], equipment: {armor: 0, hands: 0, back: 0}, stats: {maxhp: 50, hp: 0, clar: 0, int: 0, str: 0, spd: 0, con: 0, cle: 0, karma: 0}, standing: {}, party: {}}))
  console.log("First Time Startup Detected. Creating Saves Storage Object.")
}
if (localStorage.getItem('completion') == null) {
  localStorage.setItem('completion', JSON.stringify({items: [], endings: [], achievements: [], chaptersunlocked: 1}))
}
var completion = JSON.parse(localStorage.getItem('completion'))
var savegame = JSON.parse(localStorage.getItem('savegame'))

function savethegame(){
  localStorage.setItem('completion', JSON.stringify(completion))
  localStorage.setItem('savegame', JSON.stringify(savegame))
}

function createtooltip(target, header, headercolor, content, contentcolor){
  $(target).mouseover(function(){
    $("#tooltipheader").css('color', headercolor)
    $("#tooltipheader").html(header)
  })
  $(target).mouseleave(function(){
    $("#tooltipheader").html('')
  })
  $(target).mouseover(function(){
    $("#tooltipcontent").css('color', contentcolor)
    $("#tooltipcontent").html(content)
  })
  $(target).mouseleave(function(){
    $("#tooltipcontent").html('')
  })
}
function loadpage(page, invokegamestate) {
  switch (page) {
    case "home":
      $("#content").html(`
        <div style='height: 35%; text-align: center; font-size: 130px; padding-top: 5%; width: 100%; display: inline-block; user-select: none;'>
          Clarity
          <span id='titlescreenflavor' style='font-size: 16px; letter-spacing: 6px; text-shadow: 0px 1px 0px black, 0px -1px 0px black, 1px 0px 0px black, -1px 0px 0px black;'></span>
        </div>
        <div style='height: 60%; text-align: center;'>
          `+((savegame.gamestate == false) ? `` : `<div class='purplebutton' id='continuebutton' style='display: inline-block; font-size: 25px;'>Continue</div>`)+`<br/>
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
      createtooltip("#achievementsbutton", "Achievements", "white", "View your achievement progress, and see what you still haven't achieved!", "white")
      $("#achievementsbutton").click(function(){
        loadpage("achievements")
      })
      $("#endingsbutton").unbind()
      createtooltip("#endingsbutton", "Endings", "white", "View your ending progress, and see what you still haven't completed!", "white")
      $("#endingsbutton").click(function(){
        loadpage("endings")
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
      createdialoguetext("A Text Based Adventures by AspectQuote and Garaxshee", "#titlescreenflavor", false, false, false, true, "none")
      break;
    case "continue":
      $("#content").html(`
        <div style='position: absolute; top: 0; right: 0; margin: 20px;'>
          <div style='display: inline-block; padding-left: 15px; padding-right: 15px; margin: 5px;' class='yellowbutton' id='homebutton'>Home</div>
          <div style='display: inline-block; padding-left: 15px; padding-right: 15px; margin: 5px;' class='bluebutton' id='savebutton'>Save</div>
        </div>
        <div style='width: 15%; height: 100%; float: left; display: inline-block; background: rgba(0,0,0,0.2);'>
          <div style='height: 45%; padding-top: 10%;'>Inventory</div>
          <div style='height: 8%; padding-top: 1%; padding-bottom: 1%; background: rgba(0,0,0,0.2);'>Status Effects</div>
          <div style='height: 45%;'>Stats and Health</div>
        </div>
        <div style='width: 85%; height: 100%; float: left; display: inline-block; background: rgba(0,0,0,0.4);'>
          <div style='height: 80%; background: rgba(0,0,0,0.2);'>Terminal/Chat-Type Window</div>
          <div style='height: 20%; background: rgba(0,0,0,0);'>Choice Buttons</div>
        </div>
      `)
      $("#homebutton").unbind()
      $("#homebutton").click(function(){
        loadpage("home")
      })
      $("#savebutton").unbind()
      $("#savebutton").click(function(){
        savethegame()
        alert("Game Saved Successfully.")
      })
      break;
    case "newgame":
      $("#content").html(`
        <div style='font-size: 60px; height: 20%; padding-top: 5%; padding-left: 50px;'>Chapter Select</div>
        <div style='height: 75%; overflow-y: scroll; overflow-x: hidden;'>
          <div class='storyheader'>Book 1: Ballistika</div>
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
        <div style='position: absolute; top: 0; right: 0; padding-left: 15px; padding-right: 15px; margin: 20px;' class='purplebutton' id='tutorialbutton'>Tutorial</div>
        <div id='confirmbeginstoryoverlay' style='position: absolute; top: 0; left: 0; height: 100%; width: 100%; background: rgba(0,0,0,0.9);'>
          <div style='height: 100%; width: 100%; position: relative;'>
            <div class='centerme' style='user-select: none; width: 50%;'>
              <div id='startchapterflavor' style='font-size: 20px; margin-bottom: 20px; '>Begin Chapter #??? of ???</div>
              <div style='text-align: center;'>
                <div class='greenbutton' id='confirmstartchapter' style='display: inline-block; margin-bottom: 20px; margin-right: 20px;'>lmao yeah</div>
                <div class='redbutton' id='cancelstartchapter' style='display: inline-block; margin-bottom: 20px; '>naw</div>
              </div>
              <div style='color: red;'>WARNING: STARTING A NEW CHAPTER WILL IMMEDIATELY OVERWRITE ANY OTHER SAVE GAME YOU HAVE IN PROGRESS RIGHT THIS MOMENT. ONLY CONFIRM IF YOU ARE 100% SURE.</div>
            </div>
          </div>
        </div>
      `)
      $("#backbutton").unbind()
      $("#backbutton").click(function(){
        loadpage("home")
      })
      $("#cancelstartchapter").click(function(){
        $("#confirmbeginstoryoverlay").fadeOut(250)
        $("#tooltipheader").text('')
        $("#tooltipcontent").text('')
      })
      $("#confirmbeginstoryoverlay").hide()

      $("#tutorialbutton").click(function(){
        $("#startchapterflavor").html("Begin the Clarity TUTORIAL?")
        $("#confirmbeginstoryoverlay").fadeIn(250)
        $("#confirmstartchapter").unbind()
        $("#confirmstartchapter").click(function(){
          savegame = {inventory: [], gamestate: 1, statuseffects: [], equipment: {armor: 0, hands: 0, back: 0}, stats: {maxhp: 50, hp: 50, clar: 5, int: 5, str: 5, spd: 5, con: 5, cle: 5, karma: 0}, standing: {}, party: {}}
          savethegame()
        })
        createtooltip("#confirmstartchapter", "Confirm", "white", "Start the tutorial for me, please!", "white")
      })
      $("#selectchapter1").click(function(){
        $("#startchapterflavor").html("Begin Chapter #1 of BALLISTIKA?")
        $("#confirmbeginstoryoverlay").fadeIn(250)
      })
      createtooltip("#cancelstartchapter", "Cancel", "white", "I like what I have going on right now, so please don't overwrite my save data!", "white")
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
        $("#content").html(`
          <div style='font-size: 60px; height: 20%; padding-top: 5%; padding-left: 50px;'>Achievements</div>
          <div style='height: 80%; overflow-y: scroll; overflow-x: hidden;' id='achievementscontainer'></div>
          <div style='position: absolute; top: 0; left: 0; padding-left: 15px; padding-right: 15px; margin: 20px;' class='redbutton' id='backbutton'>Back</div>
        `)
        $("#backbutton").unbind()
        $("#backbutton").click(function(){
          loadpage("home")
        })
        for (var i = 0; i < achievements.length; i++) {
          achievements[i]
          $("#achievementscontainer").append("<div id='achievement"+i+"' class='achievementcontainer'><img src='"+achievements[i].icon+"' style='width: 100%; height: 100%; border-radius: 14px;' /><div class='achievementunlockeddiv'><img src='Icons/"+((completion.achievements.includes(i)) ? "checkmark" : "x")+".png' style='height: 100%; width: 100%;'/></div></div>")
          createtooltip("#achievement"+i, achievements[i].name, "white", achievements[i].desc+((completion.achievements.includes(i)) ? " <span style='color: green;'>UNLOCKED</span>" : " <span style='color: red;'>LOCKED</span>"), "#424242")
        }
      break;
    case "endings":
    $("#content").html(`
      <div style='font-size: 60px; height: 20%; padding-top: 5%; padding-left: 50px;'>Endings</div>
      <div style='height: 80%; overflow-y: scroll; overflow-x: hidden;' id='endingscontainer'></div>
      <div style='position: absolute; top: 0; left: 0; padding-left: 15px; padding-right: 15px; margin: 20px;' class='redbutton' id='backbutton'>Back</div>
    `)
    $("#backbutton").unbind()
    $("#backbutton").click(function(){
      loadpage("home")
    })
    for (var i = 0; i < endings.length; i++) {
      $("#endingscontainer").append("<div id='ending"+i+"' class='endingcontainer' style='color: "+((endings[i].canonical) ? "#d19406" : "white")+"; border: 2px solid "+((endings[i].badgood == "bad") ? "red" : "green")+";'>"+endings[i].name+"<img src='Icons/"+((completion.endings.includes(i)) ? "checkmark" : "x")+".png' style='display: inline; height: 15px; padding-left: 7px;' /></div>")
      createtooltip("#ending"+i, endings[i].book+" Chapter "+endings[i].chapter+":", "white", "Ending #"+(i+1)+((endings[i].canonical) ? " <span style='color: #d19406;'>(CANONICAL)</span>" : "")+" ("+((endings[i].badgood == "good") ? "Good" : "Bad")+"): "+((completion.endings.includes(i)) ? " <span style='color: green;'>COMPLETED</span>" : " <span style='color: red;'>NOT COMPLETED</span>"), "#424242")
    }
      break;
    case "options":
      $("#content").html(`
      <div id='optionstitle' style='height: 18%; font-size: 55px; padding-top: 2%; text-align: center;'></div>
      <div style='text-align: center;'>
        <div id='dialoguespeedbutton' class='purplebutton' style='margin-bottom: 30px; display: inline-block;'>Dialogue Speed (1x)</div><br/>
        <div id='caabutton' class='redbutton' style='margin-bottom: 30px; display: inline-block;'>CLEAR ALL ACHIEVEMENT PROGRESS</div><br/>
        <div id='caebutton' class='redbutton' style='margin-bottom: 30px; display: inline-block;'>CLEAR ALL ENDING PROGRESS</div>
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
        <div style='padding-left: 2%; padding-right: 2%; width: 96%; font-size: 15px;'><span style='padding-left: 10px;'></span>Welcome to Clarity! This is a little project created by AspectQuote and Garaxshee. Clarity is a text-based choice-making adventure game (duh) with greatly contrasting stories, loot, and endings. The idea of Clarity started a loooooooooong time ago, with a completely different title: Think Insightfully. (It's latest update was on January 12, 2020) Think Insightfully will probably never be finished due to some weird limitations and the fact that the backend is all spaghetti code (much like a few beloved source games). However, Clarity has a much different beginning than TI. AspectQuote was hanging out with Garaxshee one night and said, "Dude I have a great idea for a game." Aspect, with milk in hand, said, "Let's do it!" So, after 6 hours of brainstorming characters, story, and environments, the idea for Clarity was born. Clarity started development on November 19, 2020. After working on TF2Clicker and gaining knowledge and experience, AspectQuote decided it was time to test some of that knowledge and create a new game! (Not because he was burnt out on TF2Clicker or anything) But yeah, that begins the tale of Clarity. Go play!</div>
        <div style='text-align: center;'>
          <div style='display: inline-block; text-align: center; padding-top: 4%;'>
            <img style='height: 120px; width: 120px; border-radius: 50%; border: 2px solid white;' src='https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/4c/4c1bb9ff14a1bbbe0a97eb3d067484ca9657677a_full.jpg' />
            <div style='font-size: 16px; text-align: center; width: 100%;' id='AspectName'></div>
            <div style='font-size: 12px; text-align: center; width: 100%;'>Super Coder Man</div>
          </div>
          <div style='display: inline-block; text-align: center; margin-left: 20px;'>
            <img style='height: 120px; width: 120px; border-radius: 50%; border: 2px solid white;' src='Icons/garaxsheepfp.png' />
            <div style='font-size: 16px; text-align: center; width: 100%;' id='GaraxName'></div>
            <div style='font-size: 12px; text-align: center; width: 100%;'>Super Designer Man</div>
          </div>
        </div>
        <div style='position: absolute; bottom: 0; left: 0; background: rgba(0,0,0,0.9); font-size: 15px; padding-left: 10px; padding-top: 10px; padding-bottom: 40px; width: 100%;'>Links
          <div style='height: 100%; width: 100%; position: relative; user-select: none;'>
            <a href='https://github.com/AspectQuote' style='padding-left: 30px; font-size: 20px;' target='_blank'>Github</a>
            <a href='https://discord.com/invite/C3U8scK' style='padding-left: 30px; font-size: 20px;' target='_blank'>Discord</a>
            <a href='https://tf2clicker.com' style='padding-left: 30px; font-size: 20px;' target='_blank'>TF2Clicker</a>
            <a href='https://www.iconsdb.com' style='padding-left: 30px; font-size: 20px;' target='_blank'>IconsDB</a>
            <a href='https://aiva.ai' style='padding-left: 30px; font-size: 20px;' target='_blank'>AIVA</a>
          </div>
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
achievements = []
function createachievement(name, desc, icon){achievements.push({name: name, desc: desc, icon: icon})}
createachievement("Test Achievement", "An Achievement for achievement testing!", "Icons/questionmark.png")

endings = []
function createending(book, chapter, canonical, name, badgood){endings.push({book: book, chapter: chapter, canonical: canonical, name: name, badgood: badgood})}
createending("Ballistika", 1, true, "Normal Beginning", "good")
createending("Ballistika", 1, false, "Abnormal Beginning", "bad")
createending("Ballistika", 1, false, "Good Ending", "good")
createending("Ballistika", 1, false, "Cover Yourself in Oil", "bad")

items = []
function createitem(name, icon, rarity, description){items.push({name: name, icon: icon, rarity: rarity, desc: description})}

characters = {
  developer: {
    name: "Narrator",
    icon: "Icons/baseface.png"
  }
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

// EVERYTHING BELOW IS GAMESTATES AND GAMEPLAY/STORY. GO NO FURTHER IF YOU DON'T WANT SPOILERS.
// EVERYTHING BELOW IS GAMESTATES AND GAMEPLAY/STORY. GO NO FURTHER IF YOU DON'T WANT SPOILERS.
// EVERYTHING BELOW IS GAMESTATES AND GAMEPLAY/STORY. GO NO FURTHER IF YOU DON'T WANT SPOILERS.

function loadgamestate(state){
  if (gamestates[state] != undefined && gamestates[state] != null) {

  } else {
    console.error("Gamestate "+state+" failed to load due to not existing or being null.")
  }
}
gamestates = []
function creategamestate(dialogue, choices, func) {
  gamestates.push({
    dialogue: dialogue,
    choices: choices,
    func: func
  })
}
// Tutorial GAMESTATES (States 1-)
creategamestate(
  [
    {char: "developer", text: "Welcome to Clarity! I am so glad you could start playing!", mod: "none", color: "white", emo: "neutral"},
    {char: "developer", text: "This tutorial will teach you the basics of how to play clarity. What would you like to learn about?", mod: "none", color: "white", emo: "neutral"}
  ],
  [
    {name: "My Inventory", desc: "Explain to me how the inventory system works, how items work, and item rarity is.", col: "white", butcol: "green", state: 2},
    {name: "Status Effects", desc: "Explain to me how status effects affect me and my choices.", col: "white", butcol: "purple", state: 3},
    {name: "My Party", desc: "Explain to me how the party system works, please.", col: "white", butcol: "orange", state: 4},
    {name: "My Stats", desc: "Explain to my how my stats affect the game, what they are, and how I affect them.", col: "white", butcol: "blue", state: 5}
  ],
  function(){
    // Game-Altering Code Goes here
  }
)
