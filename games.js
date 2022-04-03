var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var firstTime = true;
var level = 0;

$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);


  checkAnswer(userClickedPattern.length - 1);

});

$(document).on("keydown", function() {

  if (firstTime) {
    $("#level-title").text("Level 0");
    nextSequence();
    firstTime = false;
  }
});

function checkAnswer(currentLevel) {

  //if (arrayEquals(gamePattern, userClickedPattern)){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("Good.");
    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else {
    $("#level-title").text("Game Over, Press Any Key to Restart.");
    playSound("wrong");
    $(".siteBody").addClass("game-over");
    setTimeout(function() {
      $(".siteBody").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

};

function nextSequence() {

  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
}

function animatePress(currentColour) {

  var setId = $("#" + currentColour);

  setId.addClass("pressed");
  setTimeout(function() {
    setId.removeClass("pressed");
  }, 100);

}

function startOver(){
   level = 0;
   gamePattern = [];
   userClickedPattern = [];
   firstTime = true;
}
