// Global Variables and Constants
let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
const btns = ["red" , "yellow" , "green" , "blue"];
let maxScore = localStorage.getItem("maxScore") || 1;

const h2 = document.querySelector("h2");
let h3 = document.createElement("h3");

// Initialization Functions
window.onload = trackMaxScore();

function trackMaxScore(){
    h3.innerText = `Your highest score is ${maxScore}`;
    h2.insertAdjacentElement("afterend" , h3);
}

//Event Listeners
//Keypress to start the game
document.addEventListener("keypress" , function(){
    if(started == false){
        started = true;

        levelUp();
    }
})

let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns){
    btn.addEventListener("click" , btnPress);
}

// Game Logic Functions
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`#${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function btnPress() {
    if(started == true){
        let btn = this;
        userFlash(btn);
        
        let userColor = btn.getAttribute("id");
        userSeq.push(userColor);

        checkAns(btn , userSeq.length - 1);
    }
}

function checkAns(btn , idx) {
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp , 1000);
        }
    }
    else{
        h2.innerHTML = `Game over! your score was <b>${level}</b> <br>Press any key to restart</br>`;

        btn.classList.add("wrongFlash");
        setTimeout(function(){
            btn.classList.remove("wrongFlash");
        } , 1500);

        let blinkCount = 0;
        const blinkInterval = setInterval(function(){
            document.querySelector("body").style.backgroundColor = blinkCount % 2 === 0 ? "red" : "white";
            blinkCount++;

            if(blinkCount === 6) {
                clearInterval(blinkInterval);
            }
        }, 250);

        if(level > maxScore){
            maxScore = level;
            localStorage.setItem("maxScore" , maxScore);
            trackMaxScore();
        }

        reset();
    }
}

// Utility Functions
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    }, 250);
}

function reset() {
    setTimeout(function(){
        started = false;
    } , 1500);
    level = 0;
    gameSeq = [];
    userSeq = [];
}