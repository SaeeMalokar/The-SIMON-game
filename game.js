let userClickedPattern = [];

let level = 0;

let gamePattern = [];

let buttonColours = ["red","blue","green","yellow"];

function nextSequence(){
    level++;
    $("h1").text("level "+level);
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
  
};

$(".btn").on("click",function(){
     let userChosenColour = $(this).attr("id");
     userClickedPattern.push(userChosenColour);
     playSound(userChosenColour);
     animatePress(userChosenColour);
     checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
    let audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

let gameStarted = false;

$(document).on("keydown",function(){
    if(!gameStarted){
        gameStarted = true;
        nextSequence();
        
    }
});

function checkAnswer(currentlevel){
    if(gamePattern[currentlevel]===userClickedPattern[currentlevel]){
        console.log("success");
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
                userClickedPattern = [];
            },1000)
        }
    } else {
        console.log("wrong");
        let wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    gameStarted = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}
