speechspeed = 3

function createdialoguetext(content, target, bold, italic, slow, spaced, modifier) {
  var interamount = 0
  switch (modifier) {
    case "wavy":
      computedmodifier = "transition-timing-function: ease-in-out; animation: wavy 1s infinite;"
      break;
    case "shaky":
      computedmodifier = "transition-timing-function: ease-in-out; animation: shaky 0.1s infinite;"
      break;
    default:
      computedmodifier = ""
  }
  var dialoguetext = setInterval(function(){
    $(target).append(`<span style='font-size: inherit; color: inherit; font-weight: ${(bold == true) ? "bold" : "normal"}; font-style: ${(italic == true) ? "italic" : "normal"}; letter-spacing: ${(spaced == true) ? "4px" : "1px"}; display: inline-block;  ${computedmodifier} '>${((content[interamount] != " ") ? content[interamount] : "<span style='padding-left: 7px;'></span>")}</span>`)
    interamount++
    if (interamount == content.length) {
      clearInterval(dialoguetext)
    }
  }, speechspeed*25*((slow != false && slow != undefined) ? 2 : 1))
}

if (localStorage.getItem('saves') == null) {
  localStorage.setItem('saves', JSON.stringify([]))
  console.log("First Time Startup Detected. Creating Saves Storage Object.")
}
var saves = JSON.parse(localStorage.getItem('saves'))

function loadpage(page) {
  switch (page) {
    case "home":
    console.log("home")
      $("#content").html(`
        <div style='height: 40%; text-align: center; font-size: 130px; padding-top: 5%; width: 100%; display: inline-block; user-select: none;'>
          Clarity
          <span id='titlescreenflavor' style='font-size: 16px; letter-spacing: 6px; text-shadow: 0px 1px 0px black, 0px -1px 0px black, 1px 0px 0px black, -1px 0px 0px black;'></span>
        </div>
        <div style='height: 55%; text-align: center;'>
          <div class='greenbutton' id='newgamebutton' style='display: inline-block; font-size: 25px;'>New Game</div><br/>
          <div class='purplebutton' id='loadsavebutton' style='display: inline-block; font-size: 25px;'>Load Save</div><br/>
          <div class='bluebutton' id='achievementsbutton' style='display: inline-block; font-size: 25px;'>Achievements</div><br/>
          <div class='orangebutton' id='endingsbutton' style='display: inline-block; font-size: 25px;'>Endings</div><br/>
          <div class='yellowbutton' id='optionsbutton' style='display: inline-block; font-size: 25px;'>Options</div>
        </div>
      `)
      $("#newgamebutton").unbind()
      $("#newgamebutton").click(function(){
        loadpage("newgame")
      })
      $("#loadsavebutton").unbind()
      $("#loadsavebutton").click(function(){
        loadpage("saves")
      })
      $("#achievementsbutton").unbind()
      $("#achievementsbutton").click(function(){
        loadpage("achievements")
      })
      $("#endingsbutton").unbind()
      $("#endingsbutton").click(function(){
        loadpage("endings")
      })
      $("#optionsbutton").unbind()
      $("#optionsbutton").click(function(){
        loadpage("options")
      })
      createdialoguetext("A Text Based Adventure Game by AspectQuote and Garaxshee", "#titlescreenflavor", false, false, false, true, "none")
      break;
    case "saves":

      break;
    case "newgame":

      break;
    case "achievements":

      break;
    case "endings":

      break;
    case "options":

      break;
    default:

  }
}

$(document).ready(function(){
  loadpage("home")
})
