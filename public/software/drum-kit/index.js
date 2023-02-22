Array.from(document.querySelectorAll(".drum")).forEach((cur_val) => {
    cur_val.addEventListener("click", trigger)
})

document.addEventListener("keydown", trigger)

function trigger(event) {
    key = event.key || this.innerHTML;

    buttonAnimation(key);

    switch (key) {
        case "q": //q crash
            audio = new Audio("sounds/crash.mp3");
            audio.play();
            break;
        case "w": //w kick
            audio = new Audio("sounds/kick-bass.mp3");
            audio.play();
            break;
        case "a": //a snare
            audio = new Audio("sounds/snare.mp3");
            audio.play();
            break;
        case "f": //f tom 1
            audio = new Audio("sounds/tom-1.mp3");
            audio.play();
            break;
        case "g": //g tom 2
            audio = new Audio("sounds/tom-2.mp3");
            audio.play();
            break;
        case "h": //h tom 3
            audio = new Audio("sounds/tom-4.mp3");
            audio.play();
            break;
        case "j": //j hi hat
            audio = new Audio("sounds/hi-hat.mp3");
            audio.play();
    }

}

function buttonAnimation(key) {
    activeButton = document.querySelector("." + key);
    activeButton.classList.add("pressed");
    setTimeout(function () {
        activeButton.classList.remove("pressed");
    }, 100)
}