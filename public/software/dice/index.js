var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var randomNumber2 = Math.floor(Math.random() * 6) + 1;

var img1 = document.querySelector(".img1");
img1.src = "images/dice" + randomNumber1 + ".png";
var img2 = document.querySelector(".img2");
img2.src = "images/dice" + randomNumber2 + ".png";

var h1 = document.querySelector("h1");

if (randomNumber1 > randomNumber2) {
    h1.innerText = "🚩Player 1 Wins!";
} else if (randomNumber1 < randomNumber2) {
    h1.innerText = "Player 2 Wins!🚩";
} else {
    h1.innerText = "Draw!";
}