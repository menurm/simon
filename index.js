let buttons = ["green", "red", "yellow", "blue"]
let clicked = 0
let level = 0
let pattern = []

function gameOver() {
  level = 0
  clicked = 0
  pattern = []
  $("h1").text('GAME OVER. PRESS ANY KEY TO RESTART')
  const audio = new Audio("sounds/wrong.mp3")
  $("body").addClass("game-over")
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 250);
  audio.play()
}

function buttonFunctionality(id) {
  const audio = new Audio("sounds/" + id + ".mp3")
  $("#" + id).addClass("pressed");
  setTimeout(function() {
    $("#" + id).removeClass("pressed");
  }, 250);
  audio.play()
}

function randomClick() {
  let i = Math.floor(Math.random() * 4)
  let button = buttons[i]
  pattern.push(button)
  buttonFunctionality(button)
}

function updateLevel() {
  level = level + 1
  $("h1").text('Level ' + String(level))
  clicked = 0
  setTimeout(function() {
    randomClick()
  }, 250)
}

$(document).on("keypress", function() {
  if (level === 0) {
    updateLevel()
  }
})

$("div[type = 'button']").click(function() {
  const id = $(this).attr('id') //button clicked
  buttonFunctionality(id)
  //check if click is equal to pattern[index]
  if (level === 0) {
    gameOver()
  } else {
    if (clicked < level) {
      if (pattern[clicked] === id) { //match increment click
        console.log('matched')
        clicked = clicked + 1
        if (clicked === level) {
          console.log('calling level update')
          updateLevel()
        }
      } else {
        gameOver()
      }
    }
  }
})
