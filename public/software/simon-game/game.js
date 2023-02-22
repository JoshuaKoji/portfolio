var button_colors = ["red", "blue", "green", "yellow"];
game_pattern = [];
user_clicked_pattern = [];
var level = 1

//Highly Advance AI
function nextSequence() {
    user_clicked_pattern = [];
    $("#level-title").text("Level " + level);
    level++;

    ran_num = Math.floor(Math.random() * 4)
    ran_chosen_color = button_colors[ran_num]
    game_pattern.push(ran_chosen_color)
    button_element = $("#" + ran_chosen_color)
    animate(button_element, "flash", 100);
    playSound(ran_chosen_color);
}

//play sound func
function playSound(button) {
    sound = new Audio("sounds/" + button + ".mp3")
    sound.play();
}

//animate
function animate(element, type, length) {
    $(element).addClass(type)
    window.setTimeout(() => {
        $(element).removeClass(type)
    }, length);
}

//check answer event
function checkAnswer() {
    btn_index = user_clicked_pattern.length - 1
    if (user_clicked_pattern[btn_index] === game_pattern[btn_index]) {
        //answered right!
        console.log("right");
        if (user_clicked_pattern.length === game_pattern.length) {
            window.setTimeout(nextSequence, 1000);
        }
    } else {
        console.log("wrong");
        // console.log(user_clicked_pattern, game_pattern);
        //answered wrong!
        new Audio("sounds/wrong.mp3").play()
        animate($("body"), "game-over", 200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        level = 0;
        game_pattern = []
        started = false
        user_clicked_pattern = [];
    }
}

var i = 0
//start game event
started = false;
first_time = true;
$(window).on("keypress", function () {
    if (first_time === true) {
        first_time = false;
        //user click event
        $("div.btn").on("click", (event) => {
            playSound(event.target.id)
            user_chosen_color = event.target.id
            user_clicked_pattern.push(user_chosen_color);
            animate(event.target, "pressed", 100)
            console.log(user_clicked_pattern);
            console.log("im going", i++);
            checkAnswer()
        })

    }
    if (started === false) {
        started = true
        nextSequence()
    }
})