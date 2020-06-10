/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
////////////////////////////variables////////////////////////////////////
var scores, roundScore, activePlayer, rollGame, highScore;
scores = [0, 0];
roundScore = 0;
activePlayer = 0;
rollGame = [];
defoltHighScore = 10

//////////////btn
btnNew = document.querySelector(".btn-new");
btnRoll = document.querySelector(".btn-roll");
btnHold = document.querySelector(".btn-hold");
btnSubmit = document.querySelector(".btn-submit");

//////////////dice
dice = document.querySelector(".dice");
dice.style.display = "none";

/////////////////////////////event btn roll///////////////////////////
btnRoll.addEventListener("click", function () {
    console.log(highScore)

    if (scores[activePlayer] < highScore) {
        var numOfDice = Math.ceil(Math.random() * 6),
            currentOfPlayer = document.querySelector("#current-" + activePlayer),
            scoreOfPlayer = document.querySelector("#score-" + activePlayer);

        dice.style.display = "block";
        dice.src = "dice-" + numOfDice + ".png";
        rollGame.push(numOfDice)
        if (rollGame[rollGame.length - 1] === 6 && rollGame[rollGame.length - 2] === 6) {
            scores[activePlayer] = 0
            scoreOfPlayer.textContent = scores[activePlayer];
            changePlayer()
        } else if (numOfDice !== 1) {
            roundScore += numOfDice;
            currentOfPlayer.textContent = roundScore;
            lose = roundScore
        } else {
            changePlayer();
        }


    } else {
        alert("PLease input high score and enter a new game!")
    }
    ///////////////////////////style on click 

    btnRoll.style.fontSize = "18px";
    document.querySelector(".ion-ios-loop").classList.toggle("rotat");
    setTimeout(function () {
        btnRoll.style.fontSize = "20px";
        document.querySelector(".ion-ios-loop").classList.toggle("rotat");
    }, 250);
})

/////////////////////////////event btn hold//////////////////////////
btnHold.addEventListener("click", function () {
    if (scores[activePlayer] < highScore) {
        var scoreOfPlayer = document.querySelector("#score-" + activePlayer);

        scores[activePlayer] += roundScore;
        scoreOfPlayer.textContent = scores[activePlayer];

        if (scores[activePlayer] >= highScore) {
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            dice.style.display = "none"
            document.querySelector(".player-" + activePlayer + "-panel").classList.toggle("active");

        } else {
            changePlayer();
        }
    } else {
        alert("PLease input high score and enter a new game!")
    }
    ///////////////////////////style on click 
    btnHold.style.fontSize = "18px";

    setTimeout(function () {
        btnHold.style.fontSize = "20px";
    }, 250);
})

////////////////////////////change player///////////////////////
function changePlayer() {
    var currentOfPlayer = document.querySelector("#current-" + activePlayer);
    roundScore = 0;
    currentOfPlayer.textContent = roundScore;
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    rollGame = []
}

////////////////////////////btn new game ////////////////////////
btnNew.addEventListener("click", function () {
    highScore = parseInt(document.querySelector("#high-score").value)
    dice.style.display = "none"
    document.querySelector("#score-0").textContent = "0"
    document.querySelector("#score-1").textContent = "0"
    document.querySelector("#current-0").textContent = "0"
    document.querySelector("#current-1").textContent = "0"
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector("#name-0").textContent = "player 1";
    document.querySelector("#name-1").textContent = "player 2";
    document.querySelector(".player-0-panel").classList.add("active");
    document.querySelector(".player-1-panel").classList.remove("active");

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
})