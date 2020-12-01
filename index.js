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
    $(target).append(`<span style='font-size: inherit; color: inherit; font-weight: ${(bold == true) ? "bold" : "normal"}; font-style: ${(italic == true) ? "italic" : "normal"}; letter-spacing: ${(spaced == true) ? "4px" : "0px"}; display: inline-block;  ${computedmodifier} '>${((content[interamount] != " ") ? content[interamount] : "<span style='padding-left: 7px;'></span>")}</span>`)
    interamount++
    if ($(target).width() == undefined) {
      interamount = content.length
    }
    if (interamount == content.length) {
      clearInterval(dialoguetext)
    }
  }, speechspeed*15*((slow != false && slow != undefined) ? 2 : 1))
}

if (localStorage.getItem('savegame') == null || JSON.parse(localStorage.getItem('savegame')).gamestate === false) {
  localStorage.setItem('savegame', JSON.stringify({inventory: [], gamestate: false, statuseffects: [], equipment: {armor: 0, hands: 0, back: 0}, stats: {maxhp: 50, hp: 0, clar: 0, int: 0, str: 0, spd: 0, con: 0, cle: 0, karma: 0}, standing: {}, party: []}))
  localStorage.setItem('completion', JSON.stringify({items: [], endings: [], achievements: [], chaptersunlocked: 0}))
  console.log("First Time Startup Detected. Creating Saves Storage Object.")
}
if (localStorage.getItem('completion') == null) {
  localStorage.setItem('completion', JSON.stringify({items: [], endings: [], achievements: [], chaptersunlocked: 0}))
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
    $("#tooltipcontent").css('color', contentcolor)
    $("#tooltipcontent").html(content)
    $("#tooltip").show()
  })
  $(target).mouseleave(function(){
    $("#tooltip").hide()
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
          `+((savegame.gamestate === false) ? `` : `<div class='purplebutton' id='continuebutton' style='display: inline-block; font-size: 25px;'>Continue</div>`)+`<br/>
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
      createdialoguetext("Text Based Adventures by AspectQuote and Garaxshee", "#titlescreenflavor", false, false, false, true, "none")
      break;
    case "continue":
      $("#content").html(`
        <div style='width: 15%; height: 100%; float: left; display: inline-block; background: rgba(0,0,0,0.2);'>
          <div style='height: 55%;'>
            <div style='height: 7%; overflow: hidden; padding-top: 5%; font-size: 25px; text-align: center;'>Inventory</div>
            <div style='height: 88%;'>
              <div style='height: 90%; width: 90%; margin: 2.5%; padding: 2.5%; border-radius: 15px; background: rgba(0,0,0,0.7); text-align: center;' id='inventorycontainer'></div>
            </div>
          </div>
          <div style='height: 8%; background: rgba(0,0,0,0.2); position: relative; margin-bottom: 2%;'>
            <div style='height: 68px; width: 90%; background: rgba(0,0,0,0.3); border-radius: 15px; position: absolute; top: 5px; left: 5%; display: inline-block;' id='statuseffectcontainer'></div>
            <div style='top: 5px; left: 2px; position: absolute; font-size: 11px; margin: 4px; transform: rotate(-12deg);'>Status Effects</div>
          </div>
          <div style='height: 45%;'>
            <div style='height: 15%;'>
              <div style='height: 50%; overflow: hidden; cursor: pointer;' id='healthbarcontainer'>
                <div style=' float: left; width: 100%; height: 100%; display: inline-block; position: relative;'><div style='width: 95%; margin-left: 1.25%; padding-left: 1.25%; padding-top: 3px; height: 70%; background-color: black; border-radius: 5px;'><div id='healthbar' style='background-color: #871C27; height: 90%; border-radius: 5px; transition: 1s; width: 0%;'></div></div><div style='position: absolute; top: -3px; right: 0px; z-index: 1; transform: rotate(12deg);'>HP</div></div>
              </div>
              <div style='height: 50%; cursor: pointer;' id='claritybarcontainer'>
                <div style=' float: left; width: 100%; height: 100%; display: inline-block; position: relative;'><div style='width: 95%; margin-left: 1.25%; padding-left: 1.25%; padding-top: 3px; height: 70%; background-color: black; border-radius: 5px;'><div id='claritybar' style='background-color: #3D3DA4; height: 90%; border-radius: 5px; transition: 1s; width: 0%;'></div></div><div style='position: absolute; top: -6px; right: 0px; z-index: 1; transform: rotate(12deg);'>Clarity</div></div>
              </div>
            </div>
            <div style='height: 65%; overflow: hidden; overflow-y: scroll; overflow-x: hidden; text-align: center;'>
              <div class='statcontainer' id='gameplaystatconcontainer'>
                <div class='statvalue' id='gameplaystatcon'>0</div>
                <div class='statname'>CON</div>
                <div class='staticon'><img src='Icons/ConstitutionIcon.png' style='height: 100%; width: 100%;' /></div>
              </div>
              <div class='statcontainer' id='gameplaystatstrcontainer'>
                <div class='statvalue' id='gameplaystatstr'>0</div>
                <div class='statname'>STR</div>
                <div class='staticon'><img src='Icons/StrengthIcon.png' style='height: 100%; width: 100%;' /></div>
              </div>
              <div class='statcontainer' id='gameplaystatspdcontainer'>
                <div class='statvalue' id='gameplaystatspd'>0</div>
                <div class='statname'>SPD</div>
                <div class='staticon'><img src='Icons/SpeedIcon.png' style='height: 100%; width: 100%;' /></div>
              </div>
              <div class='statcontainer' id='gameplaystatintcontainer'>
                <div class='statvalue' id='gameplaystatint'>0</div>
                <div class='statname'>INT</div>
                <div class='staticon'><img src='Icons/IntellectIcon.png' style='height: 100%; width: 100%;' /></div>
              </div>
              <div class='statcontainer' id='gameplaystatkarcontainer'>
                <div class='statvalue' id='gameplaystatkar'>0</div>
                <div class='statname'>KAR</div>
                <div class='staticon'><img src='Icons/KarmaIcon.png' style='height: 100%; width: 100%;' /></div>
              </div>
              <div class='statcontainer' id='gameplaystatclecontainer'>
                <div class='statvalue' id='gameplaystatcle'>0</div>
                <div class='statname'>CLE</div>
                <div class='staticon'><img src='Icons/ClevernessIcon.png' style='height: 100%; width: 100%;' /></div>
              </div>
              <div class='statcontainer' id='gameplaystatchacontainer'>
                <div class='statvalue' id='gameplaystatcha'>0</div>
                <div class='statname'>CHA</div>
                <div class='staticon'><img src='Icons/CharismaIcon.png' style='height: 100%; width: 100%;' /></div>
              </div>
              <div class='statcontainer' id='gameplaystatluccontainer'>
                <div class='statvalue' id='gameplaystatluc'>0</div>
                <div class='statname'>LUC</div>
                <div class='staticon'><img src='Icons/LuckIcon.png' style='height: 100%; width: 100%;' /></div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div style='width: 85%; height: 100%; float: left; display: inline-block; background: rgba(0,0,0,0.4);'>
          <div style='height: 77%; background: rgba(0,0,0,0.2); position: relative;' id='graphics'>
            <div style='position: absolute; top: -150px; left: 10px; width: 400px; height: 100px; transition: 2s;' id='achievementdisplaycontainer'>
              <div style='background: rgba(0,0,0,0.3); border-radius: 10px; height: 100%;'>
                <div style='font-size: 25px; padding-left: 10px; height: 30%;' id='achievementheader'>Header</div>
                <div style='height: 70%; font-size: 14px; padding-left: 15px; width: 385px;' id='achievementdesc'>Description</div>
              </div>
            </div>
            <div style='position: absolute; bottom: 0; left: 0; display: inline-block; width: 100%; height: 200px;'>
              <div style='height: 100%; width: 100%; position: relative; display: inline-block;'>
                <div style='width: 95%; height: 90%; margin-right: 2.5%; margin-left: 2.5%; background: rgba(0,0,0,0.4); border-radius: 14px;'>
                  <div style='width: 20%; height: 100%; display: inline-block; float: left;'>
                    <div style='height: 150px; width: 150px; display: inline-block; background-size: 1200px; border: 2px solid white; border-radius: 10px; margin: 13px;' id='dialogueportrait'></div>
                  </div>
                  <div style='width: 75%; height: 100%; display: inline-block; float: left; font-size: 19px;'>
                    <div style='height: 25%; width: 100%; font-size: 30px; overflow: hidden; padding-left: 10px;' id='dialoguename'>Name</div>
                    <div id='dialoguebox' style='height: 65%; overflow-y: scroll; overflow-x: hidden; font-size: inherit;'></div>
                  </div>
                </div>
                <div style='position: absolute; bottom: 5px; right: 5px; margin: 10px; padding-right: 10px; padding-left: 10px;' class='nextbutton' id='dialoguenextbutton'>Next</div>
              </div>
            </div>
          </div>
          <div style='height: 23%; background: rgba(0,0,0,0);' id='choicebuttonscontainer'>
            <div id='choicebuttoncontainer1' style='width: 50%; height: 50%; display: inline-block; float: left; text-align: center;'><div class='orangebutton' style='display: inline-block; margin-top: 10px; font-size: 17px;' id='choicebutton1'>Choice #1</div></div>
            <div id='choicebuttoncontainer2' style='width: 50%; height: 50%; display: inline-block; float: left; text-align: center;'><div class='orangebutton' style='display: inline-block; margin-top: 10px; font-size: 17px;' id='choicebutton2'>Choice #2</div></div>
            <div id='choicebuttoncontainer3' style='width: 50%; height: 50%; display: inline-block; float: left; text-align: center;'><div class='orangebutton' style='display: inline-block; margin-top: 10px; font-size: 17px;' id='choicebutton3'>Choice #3</div></div>
            <div id='choicebuttoncontainer4' style='width: 50%; height: 50%; display: inline-block; float: left; text-align: center;'><div class='orangebutton' style='display: inline-block; margin-top: 10px; font-size: 17px;' id='choicebutton4'>Choice #4</div></div>
          </div>
        </div>
        <div style='position: absolute; top: 0; right: 0; margin: 20px;'>
          <div style='display: inline-block; padding-left: 15px; padding-right: 15px; margin: 5px;' class='bluebutton' id='savebutton'>Save</div>
          <div style='display: inline-block; padding-left: 15px; padding-right: 15px; margin: 5px;' class='redbutton' id='homebutton'>Home</div>
        </div>
      `)
      $("#choicebuttoncontainer1").hide()
      $("#choicebuttoncontainer2").hide()
      $("#choicebuttoncontainer3").hide()
      $("#choicebuttoncontainer4").hide()
      if (gamestates[currentstate].dialogue[spp+1] == undefined) {
        $("#dialoguenextbutton").unbind()
        $("#dialoguenextbutton").hide()
      } else {
        $("#dialoguenextbutton").unbind()
        $("#dialoguenextbutton").fadeIn(250)
      }
      updategameplaystats()
      loadgamestate(savegame.gamestate)
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
        <div style='height: 75%; overflow-y: scroll; overflow-x: hidden;' id='chapterselectcontainer'></div>
        <div style='position: absolute; top: 0; left: 0; padding-left: 15px; padding-right: 15px; margin: 20px;' class='redbutton' id='backbutton'>Back</div>
        <div style='position: absolute; top: 0; right: 0; padding-left: 15px; padding-right: 15px; margin: 20px;' class='purplebutton' id='tutorialbutton'>Tutorial</div>
        <div id='confirmbeginstoryoverlay' style='position: absolute; top: 0; left: 0; height: 100%; width: 100%; background: rgba(0,0,0,0.9);'>
          <div style='height: 100%; width: 100%; position: relative;'>
            <div class='centerme' style='user-select: none; width: 50%;'>
              <div id='startchapterflavor' style='font-size: 20px; margin-bottom: 20px; '>Begin Chapter #??? of ???</div>
              <div style='text-align: center;'>
                <div class='greenbutton' id='confirmstartchapter' style='display: inline-block; margin-bottom: 20px; margin-right: 20px;'>Confirm</div>
                <div class='redbutton' id='cancelstartchapter' style='display: inline-block; margin-bottom: 20px; '>Cancel</div>
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
      var chapteriter = 1
      for (var i = 0; i < Object.keys(books).length; i++) {
        $("#chapterselectcontainer").append(`<div class='storyheader'>Book `+(i+1)+`: `+Object.keys(books)[i]+`</div>`)
        for (var z = 0; z < Object.keys(books[Object.keys(books)].chapters).length; z++) {
          $("#chapterselectcontainer").append(`
          <div class='chapterselectcontainer' id='selectchapter`+i+``+z+`'>
          `+((completion.chaptersunlocked >= chapteriter) ?
            `<div class='chapterselectheader'>Chapter `+(z+1)+`: `+Object.keys(books[Object.keys(books)].chapters)[z]+`</div><div class='chapterselectcontent' id='chapterdesc`+i+``+z+`'>`+books[Object.keys(books)[i]].chapters[Object.keys(books[Object.keys(books)[i]].chapters)[z]].desc+`</div>` :
            `<div class='lockedchaptercontainer'><div style='position: relative; height: 100%; width: 100%; color: inherit; font-size: inherit;'><div class='centerme'>LOCKED<img src='Icons/padlock.png' style='height: 30px;' /></div></div></div>`)+`
          </div>
          `)
          if (completion.chaptersunlocked >= chapteriter) {
            createclickablechapter(i, z, Object.keys(books)[i], Object.keys(books[Object.keys(books)].chapters)[z])
          } else {
            createtooltip(`#selectchapter`+i+``+z, "Chapter Locked.", "red", "You must complete the canonical ending for the previous chapter in order to play through this one.", "white")
          }
          chapteriter++
        }
      }

      $("#tutorialbutton").click(function(){
        $("#startchapterflavor").html("Begin the Clarity TUTORIAL?")
        $("#confirmbeginstoryoverlay").fadeIn(250)
        $("#confirmstartchapter").unbind()
        $("#confirmstartchapter").click(function(){
          savegame = {inventory: [0], gamestate: 0, statuseffects: [1], equipment: {armor: 0, hands: 0, back: 0}, stats: {maxhp: 50, hp: 50, clar: 5, int: 5, str: 5, spd: 5, con: 5, cle: 5, karma: 0, luc: 5, cha: 5}, standing: {}, party: []}
          currentstate = savegame.gamestate
          savethegame()
          loadpage("continue")
        })
        createtooltip("#confirmstartchapter", "Confirm", "white", "Start the tutorial for me, please!", "white")
      })
      $("#selectchapter1").click(function(){
        $("#startchapterflavor").html("Begin Chapter #1 of BALLISTIKA?")
        $("#confirmbeginstoryoverlay").fadeIn(250)
      })
      createtooltip("#cancelstartchapter", "Cancel", "white", "I like what I have going on right now, so please don't overwrite my save data!", "white")

      $("#selectchapter5").append("")
      $("#chapterdesc5").html("")
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
            <div style='font-size: 12px; text-align: center; width: 100%;'>Developer</div>
          </div>
          <div style='display: inline-block; text-align: center; margin-left: 20px;'>
            <img style='height: 120px; width: 120px; border-radius: 50%; border: 2px solid white;' src='Icons/garaxsheepfp.png' />
            <div style='font-size: 16px; text-align: center; width: 100%;' id='GaraxName'></div>
            <div style='font-size: 12px; text-align: center; width: 100%;'>Designer</div>
          </div>
          <div style='display: inline-block; text-align: center; margin-left: 20px;'>
            <img style='height: 120px; width: 120px; border-radius: 50%; border: 2px solid white;' src='Icons/epitaxiapfp.png' />
            <div style='font-size: 16px; text-align: center; width: 100%;' id='EpitName'></div>
            <div style='font-size: 12px; text-align: center; width: 100%;'>Playtester</div>
          </div>
          <div style='display: inline-block; text-align: center; margin-left: 20px;'>
            <img style='height: 120px; width: 120px; border-radius: 50%; border: 2px solid white;' src='Icons/co0biepfp.png' />
            <div style='font-size: 16px; text-align: center; width: 100%;' id='Co0bName'></div>
            <div style='font-size: 12px; text-align: center; width: 100%;'>Playtester</div>
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
      createdialoguetext("Co0bie", "#Co0bName", false, false, false, false, "wavy")
      createdialoguetext("Epitaxia", "#EpitName", false, false, false, false, "shaky")
      break;
    default:
      console.log("Unknown Page Attempted to load: "+page)
  }
  $("#tooltip").hide()
}

function createclickablechapter(bookid, chapterid, bookname, chaptername) {
  $("#selectchapter"+bookid+""+chapterid).unbind()
  $("#selectchapter"+bookid+""+chapterid).click(function(){
    $("#startchapterflavor").html("Begin Chapter "+(chapterid+1)+" of "+bookname+"?")
    $("#confirmbeginstoryoverlay").fadeIn(250)
    $("#confirmstartchapter").unbind()
    $("#confirmstartchapter").click(function(){
      savegame = books[bookname].chapters[chaptername].stats
      currentstate = savegame.gamestate
      savethegame()
      loadpage("continue")
    })
    createtooltip("#confirmstartchapter", "Confirm", "white", "Start this chapter for me, please!", "white")
  })
}
function updategameplaystats(){
  $("#healthbar").css("width", (((savegame.stats.hp/savegame.stats.maxhp)*100)-1.25)+"%")
  $("#healthbarcontainer").unbind()
  createtooltip("#healthbarcontainer", savegame.stats.hp+"/"+savegame.stats.maxhp+" HP", "#871C27", "", "white")

  $("#claritybar").css("width", (((savegame.stats.clar/50)*100)-1.25)+"%")
  $("#claritybarcontainer").unbind()
  createtooltip("#claritybarcontainer", savegame.stats.clar+"/50 Clarity", "#3D3DA4", "", "white")

  $("#inventorycontainer").html('')
  for (var i = 0; i < savegame.inventory.length; i++) {
    $("#inventorycontainer").append("<div class='inventoryslot' id='inventoryslot"+i+"'><img style='height: 100%; width: 100%;' src='"+items[savegame.inventory[i]].icon+"'/></div>")
    $("#inventoryslot"+i).unbind()
    createtooltip("#inventoryslot"+i, items[savegame.inventory[i]].name, items[savegame.inventory[i]].color, items[savegame.inventory[i]].desc, "white")
  }

  $("#statuseffectcontainer").html('')
  for (var i = 0; i < savegame.statuseffects.length; i++) {
    $("#statuseffectcontainer").append("<div class='statusslot' id='effectslot"+i+"'><img style='height: 100%; width: 100%;' src='"+effects[savegame.statuseffects[i]].icon+"'/></div>")
    $("#effectslot"+i).unbind()
    createtooltip("#effectslot"+i, effects[savegame.statuseffects[i]].name, ((effects[savegame.statuseffects[i]].positive) ? "red" : "white"), effects[savegame.statuseffects[i]].desc, "white")
  }

  $("#gameplaystatint").html(savegame.stats.int)
  $("#gameplaystatintcontainer").unbind()
  createtooltip("#gameplaystatintcontainer", "Intellect", "white", "The Quantification of your intelligence, common sense, and mental fortitude.", "white")
  $("#gameplaystatstr").html(savegame.stats.str)
  $("#gameplaystatstrcontainer").unbind()
  createtooltip("#gameplaystatstrcontainer", "Strength", "white", "A numerical value representing how physically strong you are.", "white")
  $("#gameplaystatspd").html(savegame.stats.spd)
  $("#gameplaystatspdcontainer").unbind()
  createtooltip("#gameplaystatspdcontainer", "Speed", "white", "How fast you are, in both reaction time and dexterity.", "white")
  $("#gameplaystatcon").html(savegame.stats.con)
  $("#gameplaystatconcontainer").unbind()
  createtooltip("#gameplaystatconcontainer", "Constitution", "white", "How <i>tough</i> you are physically. How much physical punishment you can take.", "white")
  $("#gameplaystatcle").html(savegame.stats.cle)
  $("#gameplaystatclecontainer").unbind()
  createtooltip("#gameplaystatclecontainer", "Cleverness", "white", "Your wit and critical thinking skills.", "white")
  $("#gameplaystatkar").html(savegame.stats.karma)
  $("#gameplaystatkarcontainer").unbind()
  createtooltip("#gameplaystatkarcontainer", "Karma", "white", "A mysterious force that decides how you are treated by some people.", "white")
  $("#gameplaystatluc").html(savegame.stats.luc)
  $("#gameplaystatluccontainer").unbind()
  createtooltip("#gameplaystatluccontainer", "Luck", "white", "Some call it the will of fate, your ability to have random things happen.", "white")
  $("#gameplaystatcha").html(savegame.stats.cha)
  $("#gameplaystatchacontainer").unbind()
  createtooltip("#gameplaystatchacontainer", "Charisma", "white", "How much you can influence others with only your words and looks.", "white")
}
// EVERYTHING BELOW IS CHARACTERS, ITEMS AND ENDINGS. GO NO FURTHER IF YOU DON'T WANT SPOILERS.
// EVERYTHING BELOW IS CHARACTERS, ITEMS AND ENDINGS. GO NO FURTHER IF YOU DON'T WANT SPOILERS.
// EVERYTHING BELOW IS CHARACTERS, ITEMS AND ENDINGS. GO NO FURTHER IF YOU DON'T WANT SPOILERS.

achievements = []
function createachievement(name, desc, icon){achievements.push({name: name, desc: desc, icon: icon})}
function triggerachievement(id){
  if (completion.achievements.includes(id) == false) {
    completion.achievements.push(id)
    savethegame()
    $("#achievementheader").html(achievements[id].name)
    $("#achievementdesc").html("You got an achievement! "+achievements[id].desc)
    $("#achievementdisplaycontainer").css("top", "10px")
    setTimeout(function(){
      $("#achievementdisplaycontainer").css("top", "-150px")
    }, 5000)
  } else {
    console.log("Prevented Achievement Trigger. ID: "+id)
  }
}
createachievement("Test Achievement", "An Achievement for achievement testing!", "Icons/questionmark.png")

books = {}
function createbook(name){books[name] = {chapters: {}}}
createbook("Ballistika")
function createchapter(book, name, desc, startingstats){books[book].chapters[name] = {desc: desc, stats: startingstats}}
createchapter("Ballistika", "Birth", "Lorem Ipsum...", {inventory: [], gamestate: false, statuseffects: [], equipment: {armor: 0, hands: 0, back: 0}, stats: {maxhp: 50, hp: 50, clar: 5, int: 5, str: 5, spd: 5, con: 5, cle: 5, karma: 0, luc: 5, cha: 5}, standing: {}, party: []})
createchapter("Ballistika", "Mother", "Lorem Ipsum...", {inventory: [], gamestate: false, statuseffects: [], equipment: {armor: 0, hands: 0, back: 0}, stats: {maxhp: 50, hp: 50, clar: 5, int: 5, str: 5, spd: 5, con: 5, cle: 5, karma: 0, luc: 5, cha: 5}, standing: {}, party: []})
createchapter("Ballistika", "Gladiator", "Lorem Ipsum...", {inventory: [], gamestate: false, statuseffects: [], equipment: {armor: 0, hands: 0, back: 0}, stats: {maxhp: 50, hp: 50, clar: 5, int: 5, str: 5, spd: 5, con: 5, cle: 5, karma: 0, luc: 5, cha: 5}, standing: {}, party: []})
createchapter("Ballistika", "The Mirror", "Lorem Ipsum...", {inventory: [], gamestate: false, statuseffects: [], equipment: {armor: 0, hands: 0, back: 0}, stats: {maxhp: 50, hp: 50, clar: 5, int: 5, str: 5, spd: 5, con: 5, cle: 5, karma: 0, luc: 5, cha: 5}, standing: {}, party: []})
createchapter("Ballistika", "Death", "Lorem Ipsum...", {inventory: [], gamestate: false, statuseffects: [], equipment: {armor: 0, hands: 0, back: 0}, stats: {maxhp: 50, hp: 50, clar: 5, int: 5, str: 5, spd: 5, con: 5, cle: 5, karma: 0, luc: 5, cha: 5}, standing: {}, party: []})

endings = []
function createending(book, chapter, canonical, name, badgood){endings.push({book: book, chapter: chapter, canonical: canonical, name: name, badgood: badgood})}
createending("Ballistika", 1, true, "Normal Beginning", "good")
createending("Ballistika", 1, false, "Abnormal Beginning", "bad")
createending("Ballistika", 1, false, "Good Ending", "good")
createending("Ballistika", 1, false, "Cover Yourself in Oil", "bad")

items = []
function createitem(name, icon, color, description){items.push({name: name, icon: icon, color: color, desc: description})}
createitem("Leek", "ItemIcons/Leek.png", "#689f38", "A Classic Green Onion. This is the holy tutorial leek, and Aspect's favorite food (Don't let him have it). ALL HAIL LEEKSPIN.")

effects = []
function createstatuseffect(name, icon, desc, positive){effects.push({name: name, icon: icon, desc: desc, positive: positive})}
createstatuseffect("Tipsy", "EffectIcons/Tipsy.png", "You had a little to drink and now you have some alcohol in your system.", false)
createstatuseffect("Educated", "EffectIcons/Educated.png", "You started the tutorial and are learning useful and cool things!", false)

characters = {
  developer: {
    name: "Narrator",
    icon: "CharacterFaces/Narrator.png"
  },
  gorl: {
    name: "A GIRL!?!",
    icon: "CharacterFaces/Female1.png"
  }
}

function animatespeech(target, text, emo, slow) {
  var textloopnum = 0
  $("#dialoguenextbutton").fadeOut(250)
  var animspeech = setInterval(function(){
    if ($(target).css("background-position") != emotemap[emo][0][0]+"px "+emotemap[emo][0][1]+"px") {
      $(target).css("background-position", emotemap[emo][0][0]+"px "+emotemap[emo][0][1]+"px")
    } else {
      $(target).css("background-position", emotemap[emo][1][0]+"px "+emotemap[emo][1][1]+"px")
    }
    textloopnum += 2
    if (textloopnum >= text.length) {
      clearInterval(animspeech)
      $(target).css("background-position", emotemap[emo][0][0]+"px "+emotemap[emo][0][1]+"px")
      if (gamestates[currentstate].dialogue[spp+1] == undefined) {
        $("#dialoguenextbutton").fadeOut(250)
        $("#dialoguenextbutton").unbind()
        for (var i = 0; i < gamestates[currentstate].choices.length; i++) {
          console.log("created button for #"+i)
          $("#choicebutton"+(i+1)).html(gamestates[currentstate].choices[i].name+"<br /><span style='color: inherit; font-size: 11px;'>"+gamestates[currentstate].choices[i].desc+"</span>")
          $("#choicebutton"+(i+1)).attr('class', gamestates[currentstate].choices[i].butcol+"button")
          $("#choicebutton"+(i+1)).css('color', gamestates[currentstate].choices[i].col)
          $("#choicebutton"+(i+1)).unbind()
          createchoicebutton(i)
        }
        switch (gamestates[currentstate].choices.length) {
          case 1:
            $("#choicebuttoncontainer1").fadeIn(1000)
            $("#choicebuttoncontainer2").hide()
            $("#choicebuttoncontainer3").hide()
            $("#choicebuttoncontainer4").hide()
            break;
          case 2:
            $("#choicebuttoncontainer1").fadeIn(1000)
            $("#choicebuttoncontainer2").fadeIn(1000)
            $("#choicebuttoncontainer3").hide()
            $("#choicebuttoncontainer4").hide()
            break;
          case 3:
            $("#choicebuttoncontainer1").fadeIn(1000)
            $("#choicebuttoncontainer2").fadeIn(1000)
            $("#choicebuttoncontainer3").fadeIn(1000)
            $("#choicebuttoncontainer4").hide()
            break;
          case 4:
            $("#choicebuttoncontainer1").fadeIn(1000)
            $("#choicebuttoncontainer2").fadeIn(1000)
            $("#choicebuttoncontainer3").fadeIn(1000)
            $("#choicebuttoncontainer4").fadeIn(1000)
            break;
          default:
            $("#choicebuttoncontainer1").fadeIn(1000)
            $("#choicebuttoncontainer2").hide()
            $("#choicebuttoncontainer3").hide()
            $("#choicebuttoncontainer4").hide()
        }
      } else {
        $("#dialoguenextbutton").fadeIn(250)
        $("#dialoguenextbutton").unbind()
      }
      $("#dialoguenextbutton").click(function(){
        spp++
        $("#dialoguenextbutton").unbind()
        loadgamestate(currentstate)
      })
    }
  }, (speechspeed*15*((slow != false && slow != undefined) ? 2 : 1))*2)
}
function createchoicebutton(i){
  $("#choicebutton"+(i+1)).click(function(){
    if (gamestates[currentstate].choices[i].condition[0] == "none" || savegame.stats[gamestates[currentstate].choices[i].condition[0]] >= gamestates[currentstate].choices[i].condition[1]) {
      if (gamestates[currentstate].choices[i].effectcond === false || savegame.statuseffects.includes(gamestates[currentstate].choices[i].effectcond) == true) {
        if (gamestates[currentstate].choices[i].itemcond === false || savegame.inventory.includes(gamestates[currentstate].choices[i].itemcond) == true) {
          spp = 0
          savethegame()
          loadgamestate(gamestates[currentstate].choices[i].state)
          gamestates[currentstate].func()
          updategameplaystats()
        } else {
          console.log("Prevented Successfully! (Item Condition)")
        }
      } else {
        console.log("Prevented Successfully! (Effect Condition)")
      }
    } else {
      console.log("Prevented Successfully! (Stat Condition)")
    }
  })
  if (gamestates[currentstate].choices[i].condition[0] != "none" || gamestates[currentstate].choices[i].effectcond !== false || gamestates[currentstate].choices[i].itemcond !== false || gamestates[currentstate].choices[i].partycond !== false) {
    console.log("creating condition tooltip. "+(i+1))
    createtooltip(
      "#choicebutton"+(i+1),
      "Condition: ",
      (((gamestates[currentstate].choices[i].partycond === false || savegame.party.includes(gamestates[currentstate].choices[i].partycond) == true) && (gamestates[currentstate].choices[i].effectcond === false || savegame.statuseffects.includes(gamestates[currentstate].choices[i].effectcond) == true) && (gamestates[currentstate].choices[i].itemcond === false || savegame.inventory.includes(gamestates[currentstate].choices[i].itemcond) == true) && (gamestates[currentstate].choices[i].condition[0] == "none" || savegame.stats[gamestates[currentstate].choices[i].condition[0]] >= gamestates[currentstate].choices[i].condition[1])) ? "green" : "red"),
      (((gamestates[currentstate].choices[i].condition[0] !== "none") ? "- Requires your "+gamestates[currentstate].choices[i].condition[0].toUpperCase()+" stat be greater than or equal to "+gamestates[currentstate].choices[i].condition[1]+"." : "") + ((gamestates[currentstate].choices[i].condition[0] != "none" && gamestates[currentstate].choices[i].effectcond !== false) ? "<br />" : "") + ((gamestates[currentstate].choices[i].effectcond !== false) ? "- Requires your to have the status effect '"+effects[gamestates[currentstate].choices[i].effectcond].name+"'." : "") + ((gamestates[currentstate].choices[i].effectcond !== false && gamestates[currentstate].choices[i].itemcond !== false) ? "<br />" : "") + ((gamestates[currentstate].choices[i].itemcond !== false) ? "- Requires you to have the item '"+items[gamestates[currentstate].choices[i].itemcond].name+"'." : "")) + ((gamestates[currentstate].choices[i].itemcond !== false && gamestates[currentstate].choices[i].partycond !== false) ? "<br />" : "") + ((gamestates[currentstate].choices[i].partycond !== false) ? "- Requires you to have "+gamestates[currentstate].choices[i].partycond+" in your party." : ""),
      "white"
    )
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

// EVERYTHING BELOW IS GAMESTATES AND GAMEPLAY/STORY. GO NO FURTHER IF YOU REALLY DON'T WANT SPOILERS.
// EVERYTHING BELOW IS GAMESTATES AND GAMEPLAY/STORY. GO NO FURTHER IF YOU REALLY DON'T WANT SPOILERS.
// EVERYTHING BELOW IS GAMESTATES AND GAMEPLAY/STORY. GO NO FURTHER IF YOU REALLY DON'T WANT SPOILERS.

msgnum = 0
spp = 0
currentstate = savegame.gamestate
emotemap = {
  neutral: [[0,0], [-150,0]],
  happy: [[-300,0], [-450,0]],
  sad: [[-600,0], [-750,0]],
  skeptical: [[-900,0], [-1050,0]],

  notimpressed: [[0,-150], [-150,-150]],
  selfassured: [[-300,-150], [-450,-150]],
  surprised: [[-600,-150], [-750,-150]],
  wary: [[-900,-150], [-1050,-150]],

  worried: [[0,-300], [-150,-300]],
  annoyed: [[-300,-300], [-450,-300]],
  contemplative: [[-600,-300], [-750,-300]],
  evil: [[-900,-300], [-1050,-300]],

  disgusted: [[0,-450], [-150,-450]],
  crying: [[-300,-450], [-450,-450]],
  angry: [[-600,-450], [-750,-450]],
  drunk: [[-900,-450], [-1050,-450]]
}
function loadgamestate(state){
  if (gamestates[state] != undefined && gamestates[state] != null) {
    currentstate = state
    savegame.gamestate = state
    $("#choicebuttoncontainer1").fadeOut(500)
    $("#choicebuttoncontainer2").fadeOut(500)
    $("#choicebuttoncontainer3").fadeOut(500)
    $("#choicebuttoncontainer4").fadeOut(500)
    $("#dialoguebox").html('')
    createdialoguetext(gamestates[state].dialogue[spp].text, "#dialoguebox", ((gamestates[state].dialogue[spp].mod === "none") ? false : gamestates[state].dialogue[spp].mod.bold), ((gamestates[state].dialogue[spp].mod === "none") ? false : gamestates[state].dialogue[spp].mod.italic), ((gamestates[state].dialogue[spp].mod === "none") ? false : gamestates[state].dialogue[spp].mod.slow), ((gamestates[state].dialogue[spp].mod === "none") ? false : gamestates[state].dialogue[spp].mod.spaced), ((gamestates[state].dialogue[spp].mod === "none") ? false : gamestates[state].dialogue[spp].mod.mod))
    $("#dialogueportrait").css("background-image", "url('"+characters[gamestates[state].dialogue[spp].char].icon+"')")
    $("#dialoguename").html(characters[gamestates[state].dialogue[spp].char].name)
    animatespeech("#dialogueportrait", gamestates[state].dialogue[spp].text, gamestates[state].dialogue[spp].emo, ((gamestates[state].dialogue[spp].mod === "none") ? false : gamestates[state].dialogue[spp].mod.slow))
    msgnum++
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
// Tutorial GAMESTATES (States 1-5)
creategamestate(
  [
    {char: "developer", text: "Welcome to Clarity! I am so glad you decided to learn how to play the game!", mod: "none", color: "white", emo: "happy"},
    {char: "developer", text: "This tutorial will teach you the basics of how to play Clarity. What would you like to learn about?", mod: "none", color: "white", emo: "neutral"}
  ],
  [
    {name: "My Inventory", desc: "Explain to me how the inventory system works, how items work, and what item rarity is.", col: "white", butcol: "green", state: 1, condition: ["none", 0], effectcond: false, itemcond: false, partycond: false},
    {name: "Status Effects", desc: "Explain to me how status effects affect me and my choices.", col: "white", butcol: "purple", state: 2, condition: ["none", 0], effectcond: false, itemcond: false, partycond: false},
    {name: "My Party", desc: "Explain to me how the party system works, please.", col: "white", butcol: "orange", state: 3, condition: ["none", 0], effectcond: false, itemcond: false, partycond: false},
    {name: "My Stats", desc: "Explain to me how my stats affect the game, what they are, and how I can alter them.", col: "white", butcol: "blue", state: 4, condition: ["none", 0], effectcond: false, itemcond: false, partycond: false}
  ],
  function(){
    // Game-Altering Code Goes here
  }
) // Starting Text
creategamestate(
  [
    {char: "developer", text: "The inventory system in clarity is very simple.", mod: "none", color: "white", emo: "selfassured"},
    {char: "developer", text: "Your items are displayed at the top left of your screen, and you have no maximum inventory slot limit.", mod: "none", color: "white", emo: "happy"},
    {char: "developer", text: "When you hover your cursor over an item, you will get to see that item's tooltip.", mod: "none", color: "white", emo: "happy"},
    {char: "developer", text: "The tooltip will show you all sorts of information like the item's rarity, name and description.", mod: "none", color: "white", emo: "happy"},
    {char: "developer", text: "Put your cursor over the leek in your inventory, and you will see it's tooltip!", mod: "none", color: "white", emo: "happy"},
    {char: "developer", text: "Speaking of which, rarity in Clarity is also very simple.", mod: "none", color: "white", emo: "happy"},
    {char: "developer", text: "The warmer and more saturated the color of the item's name is, the rarer it is. To contrast, the less saturated and cooler the color is, the more common it is.", mod: "none", color: "white", emo: "happy"},
    {char: "developer", text: "For example, an item with a bright red name is very rare, but an item with a white name is very common. The Leek in your inventory has a cooler color so it is a more common item.", mod: "none", color: "white", emo: "happy"},
    {char: "developer", text: "Sometimes the choices you can make are reliant upon whether or not you have an item. If a choice requires you to have an item it will show in it's tooltip.", mod: "none", color: "white", emo: "happy"},
    {char: "developer", text: "Seem simple enough? What would you like me to explain next?", mod: "none", color: "white", emo: "happy"}
  ],
  [
    {name: "My Inventory", desc: "Explain to me how the inventory system works again, please.", col: "white", butcol: "green", state: 1, condition: ["none", 0], effectcond: false, itemcond: false, partycond: false},
    {name: "Status Effects", desc: "Explain to me how status effects affect me and my choices.", col: "white", butcol: "purple", state: 2, condition: ["none", 0], effectcond: false, itemcond: false, partycond: false},
    {name: "My Party", desc: "Explain to me how the party system works, please.", col: "white", butcol: "orange", state: 3, condition: ["none", 0], effectcond: false, itemcond: false, partycond: false},
    {name: "My Stats", desc: "Explain to me how my stats affect the game, what they are, and how I can alter them.", col: "white", butcol: "blue", state: 4, condition: ["none", 0], effectcond: false, itemcond: false, partycond: false}
  ],
  function(){
    // Game-Altering Code Goes here
  }
) // Explaining Inventory
creategamestate(
  [
    {char: "developer", text: "Status effects in Clarity are a very odd mechanic.", mod: "none", color: "white", emo: "neutral"},
    {char: "developer", text: "When you become afflicted with a status effect, it will show on the left of your screen, just beneath the inventory.", mod: "none", color: "white", emo: "neutral"},
    {char: "developer", text: "Hovering your cursor over the effect will display a tooltip with information about the effect.", mod: "none", color: "white", emo: "neutral"},
    {char: "developer", text: "Hover over the graduation cap effect on the left. You will see that it's name is 'Educated', and you got it for starting the tutorial.", mod: "none", color: "white", emo: "neutral"},
    {char: "developer", text: "Status effects can have a multitude of effects on you.", mod: "none", color: "white", emo: "neutral"},
    {char: "developer", text: "Some can drain your health, make your party members dislike you, or even lock you out of certain choices!", mod: "none", color: "white", emo: "neutral"},
    {char: "developer", text: "Status effects can wear off, but some stick with you forever or can just be cured.", mod: "none", color: "white", emo: "neutral"},
    {char: "developer", text: "That's my two cents on status effects. What next?", mod: "none", color: "white", emo: "neutral"}
  ],
  [
    {name: "My Inventory", desc: "Explain to me how the inventory system works, how items work, and what item rarity is.", col: "white", butcol: "green", state: 1, condition: ["none", 0], effectcond: false, itemcond: false, partycond: false},
    {name: "Status Effects", desc: "Explain to me how status effects work again, please.", col: "white", butcol: "purple", state: 2, condition: ["none", 0], effectcond: false, itemcond: false, partycond: false},
    {name: "My Party", desc: "Explain to me how the party system works, please.", col: "white", butcol: "orange", state: 3, condition: ["none", 0], effectcond: false, itemcond: false, partycond: false},
    {name: "My Stats", desc: "Explain to me how my stats affect the game, what they are, and how I can alter them.", col: "white", butcol: "blue", state: 4, condition: ["none", 0], effectcond: false, itemcond: false, partycond: false}
  ],
  function(){
    // Game-Altering Code Goes here
  }
) // Explaining Status Effects
creategamestate(
  [
    {char: "developer", text: "The Party system in clarity is fairly easy to comprehend.", mod: "none", color: "white", emo: "selfassured"},
    {char: "developer", text: "Your 'party' in clarity is essentially all the people/characters that are following you.", mod: "none", color: "white", emo: "neutral"},
    {char: "developer", text: "Each member of your party will have some dialogue and even open up specific choices.", mod: "none", color: "white", emo: "neutral"},
    {char: "developer", text: "However, your party members can leave you or even die if not treated properly.", mod: "none", color: "white", emo: "neutral"},
    {char: "developer", text: "So make sure you treat your party members properly!", mod: "none", color: "white", emo: "neutral"},
    {char: "developer", text: "What would you like me to explain next?", mod: "none", color: "white", emo: "neutral"}
  ],
  [
    {name: "My Inventory", desc: "Explain to me how the inventory system works, how items work, and what item rarity is.", col: "white", butcol: "green", state: 1, condition: ["none", 0], effectcond: false, itemcond: false, partycond: false},
    {name: "Status Effects", desc: "Explain to me how status effects work, please.", col: "white", butcol: "purple", state: 2, condition: ["none", 0], effectcond: false, itemcond: false, partycond: false},
    {name: "My Party", desc: "Explain to me how the party system works again, please.", col: "white", butcol: "orange", state: 3, condition: ["none", 0], effectcond: false, itemcond: false, partycond: false},
    {name: "My Stats", desc: "Explain to me how my stats affect the game, what they are, and how I can alter them.", col: "white", butcol: "blue", state: 4, condition: ["none", 0], effectcond: false, itemcond: false, partycond: false}
  ],
  function(){
    // Game-Altering Code Goes here
  }
) // Explaining the Party System
creategamestate(
  [
    {char: "developer", text: "Your stats in clarity are all numerical quantifications of your aptitudes.", mod: "none", color: "white", emo: "selfassured"},
    {char: "developer", text: "In layman's terms, each is your abilities on a scale from 1-20.", mod: "none", color: "white", emo: "happy"},
    {char: "developer", text: "Having stats helps you have different choices.", mod: "none", color: "white", emo: "happy"},
    {char: "developer", text: "Some choices require you to have a high enough stat for them.", mod: "none", color: "white", emo: "happy"},
    {char: "developer", text: "For example, you may not be able to lift a rock if your strength stat isn't high enough; you may just have to go around it.", mod: "none", color: "white", emo: "happy"},
    {char: "developer", text: "Your stats are on the bottom left, and if you put your cursor over them, you can see a basic description of the stat with it's tooltip.", mod: "none", color: "white", emo: "happy"},
    {char: "developer", text: "Likewise, some choices will allow you to increase or decrease your stats; though you won't know whether it does or not until you make the choice.", mod: "none", color: "white", emo: "happy"},
    {char: "developer", text: "...and that's about it for your stats, which next?", mod: "none", color: "white", emo: "happy"}
  ],
  [
    {name: "My Inventory", desc: "Explain to me how the inventory system works, how items work, and what item rarity is.", col: "white", butcol: "green", state: 1, condition: ["none", 0], effectcond: false, itemcond: false, partycond: false},
    {name: "Status Effects", desc: "Explain to me how status effects work, please.", col: "white", butcol: "purple", state: 2, condition: ["none", 0], effectcond: false, itemcond: false, partycond: false},
    {name: "My Party", desc: "Explain to me how the party system works, please.", col: "white", butcol: "orange", state: 3, condition: ["none", 0], effectcond: false, itemcond: false, partycond: false},
    {name: "My Stats", desc: "Explain to me again how my stats affect the game, what they are, and how I can alter them.", col: "white", butcol: "blue", state: 4, condition: ["none", 0], effectcond: false, itemcond: false, partycond: false}
  ],
  function(){
    // Game-Altering Code Goes here
  }
) // Explaining Character Stats
/*
creategamestate(
  [
    {char: "developer", text: "You aren't supposed to be reading this.", mod: "none", color: "white", emo: "surprised"},
  ],
  [
    {name: "Choice 1 (Required)", desc: "", col: "white", butcol: "green", state: 1, condition: ["none", 0], effectcond: false, itemcond: false, partycond: false},
    {name: "Choice 2 (Optional)", desc: "", col: "white", butcol: "green", state: 2, condition: ["none", 0], effectcond: false, itemcond: false, partycond: false},
    {name: "Choice 3 (Optional)", desc: "", col: "white", butcol: "green", state: 3, condition: ["none", 0], effectcond: false, itemcond: false, partycond: false},
    {name: "Choice 4 (Optional)", desc: "", col: "white", butcol: "green", state: 4, condition: ["none", 0], effectcond: false, itemcond: false, partycond: false}
  ],
  function(){
    // Game-Altering Code Goes here, code will execute the moment this gamestate comes into effect.
  }
)
*/
