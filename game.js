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

let bestScore = localStorage.getItem("bestScore") || 0; 

function showScores(currentScore) {

    $("#score-box").remove();

    $("body").append(`
        <div id="score-box" style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.15);
            border: 2px solid #fff;
            border-radius: 10px;
            padding: 20px 40px;
            color: white;
            font-family: 'Press Start 2P', cursive;
            text-align: center;
            z-index: 999;
            transition: opacity 0.5s ease;">
            <p>Current Score: <span id="current">${currentScore}</span></p>
            <p>Best Score: <span id="best">${bestScore}</span></p>
        </div>
    `);


    setTimeout(() => {
        $("#score-box").css("opacity", "0");
        setTimeout(() => $("#score-box").remove(), 500);
    }, 2000);
}


function checkAnswer(currentlevel){
    if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function(){
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    } else {
        console.log("wrong");
        let wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");


        let currentScore = Math.max(level - 1, 0);
        if (currentScore > bestScore) {
            bestScore = currentScore;
            localStorage.setItem("bestScore", bestScore);
        }
        showScores(currentScore);

        startOver();
    }
}
