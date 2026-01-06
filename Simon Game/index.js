var buttonColors = ["red", "blue", "green", "yellow"];


var gamePattern = [];
var userChosenColour;
var userClickedPattern = [];


var started = false;
var level=0;

//it is used to know if any key is pressed then starts the game
$(document).on("keypress", function(){
    if(!started){
        $("h1").text("Level "+level);
        nextSequence();
        started = true;
    }
});

//This is used to form an array with user clicks
$(".btn").click(function(){

    userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(this.id);
    animatePress(this.id);
    checkAnswer(userClickedPattern.length-1);
    
 });


/*It is used to check if the answer is correct or not if yes it continues
 Otherwise else block will be executed*/
function checkAnswer(currentLevel){
    //checks most recent value of gamePattern array and userClickedPattern array are equal or not.
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        /*this is very important condition without this the nextSequence function 
        will be called repeatedly for every 1000milli seconds to avoid it ,we should have this condition
        this condition will true if all values in both arrays are true as the above condition checks 
        the latest values in the array in this way all elements are checked and alse the length.*/
        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
                nextSequence();
            },1000);

        }
    }else{
        console.log("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");

        //style for background in the time of wrong audio
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 100);

        //audio of the wrong click.
        playSound("wrong");

        //this will be called when user input is wrong and restarts the game.
        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];
    //Used to increment the level.
    level++;
    $("h1").text("Level "+level);

    //Used to get computers choice.
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);

}

//Used to play the audio
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


//Style for every color user pressed
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


//It is used to reset the value and again initializes everything.
function startOver(){

    gamePattern = [];
    started = false;
    level=0;

}