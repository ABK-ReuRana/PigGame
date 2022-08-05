'use strict';

// user had 3options
const rollDice = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew=document.querySelector(".btn--new");

const diceEle = document.querySelector(".dice");
document.querySelector(".dice").classList.add("hidden");

// set intilal score to 0 and image invisible
const player0ELe = document.querySelector(".player--0");
const player1ELe = document.querySelector(".player--1");
const current0Ele = document.getElementById("current--0");
const current1Ele = document.getElementById("current--1");

const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
score0.textContent = 0;
score1.textContent = 0;

const wins0 = document.getElementById("name--0");
const wins1 = document.getElementById("name--1");

let playing = true;
//-------------------- roll a dice--------------------------------------------
let currentScore = 0;

function switchPlayers(activePl, DiActivePl, activePlCurrentScore) {
    activePlCurrentScore.textContent = 0;
    activePl.classList.remove('player--active');
    DiActivePl.classList.add('player--active');
}

rollDice.addEventListener("click", function () {
    if (playing) {
        //1. random dice number
        const diceNumber = Math.floor(Math.random() * 6) + 1;
        //2.display dice image   
        diceEle.classList.remove("hidden");
        diceEle.src = `dice-${diceNumber}.png`;
        // 3.check for dice number 1 (2 choices Player1 , Player2)
        if (diceNumber != 1) {
            currentScore += diceNumber;
            // joh player active h usme score add hoga
            if (player0ELe.classList.contains("player--active")) {
                current0Ele.textContent = currentScore;
            } else {
                current1Ele.textContent = currentScore;
            }
        } else {
            if (player0ELe.classList.contains("player--active")) {
                // switch to player 2 
                switchPlayers(player0ELe, player1ELe, current0Ele);
            } else {
                // switch to player 1 
                switchPlayers(player1ELe, player0ELe, current1Ele);
            }
            currentScore = 0;
        }
    }
})

//--------------------------hold a score----------------------------------------

function updateTotalScore(actPl, diActPl, actScore, actCurrent){
    const nScore = Number(actScore.textContent) + Number(actCurrent.textContent);
    actScore.textContent = nScore;
    // wins game
    if (nScore >= 30) {
        playing=false;
        actPl.classList.add("player--winner"); 
        actCurrent.textContent = 0;
        if(player0ELe.classList.contains('player--active')){
            wins0.textContent=`${wins0.textContent} wins🎉`;
        } else{
            wins1.textContent=`${wins1.textContent} wins🎉`; 
        }
        
    }else{
        switchPlayers(actPl, diActPl, actCurrent);
    }   
}

btnHold.addEventListener("click", function () {
    if (playing) {
        if (player0ELe.classList.contains("player--active")) {
            updateTotalScore(player0ELe,player1ELe,score0,current0Ele);
        } else {
            updateTotalScore(player1ELe,player0ELe,score1,current1Ele);
        }
        currentScore = 0;
    }
})

//----------------reset the game---------------------------

btnNew.addEventListener("click", function(){
    current0Ele.textContent=0;
    current1Ele.textContent=0;
    score0.textContent=0;
    score1.textContent=0;
    currentScore=0;

    if(player0ELe.classList.contains("player--winner")){
        wins0.textContent="player 1";
        player0ELe.classList.remove("player--winner");
    } else{
        wins1.textContent="player 2";
        player1ELe.classList.remove("player--winner");
        player1ELe.classList.remove("player--active");
    }
    player0ELe.classList.add("player--active");
    document.querySelector(".dice").classList.add("hidden");
    playing=true;
})