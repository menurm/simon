let buttons = ["green", "red", "yellow", "blue"]
let clicked = 0
let level = 0
let pattern = []
let current_score = 0

function gameOver() {
  let highScore = localStorage.getItem('highScore')
  if(!highScore){
    localStorage.setItem('highScore', current_score)
  }else{
    if(current_score>highScore){
      localStorage.setItem('highScore', current_score)
    }
  }
  let score_title = "<h1 class='score-title'>" + "High Score: " + String(localStorage.getItem('highScore'))+ "</h1>"
  level = 0
  clicked = 0
  pattern = []
  current_score = 0
  $("h1[id='level-title']").text('GAME OVER. CLICK HERE TO RESTART')
  $(score_title).insertAfter('.score-title')
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
  }, 200);
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
  $("h1[id='level-title']").text('Level ' + String(level))
  $("h1[class='score-title']").text("Current Score: " + String(current_score))
  clicked = 0
  setTimeout(function() {
    randomClick()
  }, 250)
}

$("#level-title").on("click", function() {
  if (level === 0) {
    if($('.score-title').length>0){
      $('.score-title').remove();
    }
    let score_title = "<h1 class='score-title'></h1>"
    $(score_title).insertAfter('#level-title')
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
          current_score++
          updateLevel()
        }
      } else {
        gameOver()
      }
    }
  }
})
$('#instruction-tog').text('Close')
$("#instruction-tog").click(function(e){
  $(this).text($(this).text() == 'Close'? "Instructions" : "Close")
  $("#instruction").slideToggle();
})
