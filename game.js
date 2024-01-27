var gamePattern = [];
var userClickPattern = [];
var level = 0;
var pressed = 0;
var buttonColours = ["red", "blue", "green", "yellow"];
var redButton = $("#red");
var blueButton = $("#blue");
var greenButton = $("#green");
var yellowButton = $("#yellow");

$(document).keypress(function(event){
    $("h1").text("Level " + level);

    if(pressed === 0)
        nextSequence(), pressed = 1;

    //console.log(event.key);
});



$(".btn").on("click", function(event) {

    var userColor = event.target.id;
    playSound(userColor);

    userClickPattern.push(userColor);

    animatePress(userColor);

    checkAnswer(userClickPattern.length - 1);

    
    //console.log(clickBtn);
});


function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickPattern[currentLevel])
    {   if (userClickPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            },1000);
        }   
    }else wrongAnswer();

}


function wrongAnswer(){

    $("body").addClass("game-over");

    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);

    new Audio("./sounds/wrong.mp3").play();

    $("h1").text("Game Over, Press Any Key to Restart");

    restart();
};


function restart(){
    level = 0;
    gamePattern = [];
    pressed = 0;
}


function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    level++;
    $("h1").text("Level " + level);

   
    userClickPattern = [];

}



function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();

}


function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    
    setTimeout(function(){

        $("#" + currentColor).removeClass("pressed");

    },100);
}
