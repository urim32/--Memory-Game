class Game {
    constructor() {}
    startGame() {
        cards.forEach((card) => card.addEventListener('click', flipCard));

        matchedArray = [];
        totalFlips = 0;
        timeRemening = 80;
        shuffleCards();
        countdown = setInterval(timeCountDown, 1000);
        hideCards();
        time.innerText = timeRemening;
        flips.innerText = totalFlips;
    }
}

let cards = document.querySelectorAll('.card');

let time = document.querySelector('#time');
let flips = document.querySelector('#flips');
let overlays = document.querySelectorAll('.overlay-text');
let matchedArray = [];
overlays.forEach((overlay) => {
    overlay.addEventListener('click', () => {
        overlay.classList.remove('visible');

        startGame();
    });
});
let card1;
let card2;
let totalFlips;
let countdown;
let timeRemening;
let cardFlipped = false;
let disableCardFlipped = false;

function shuffleCards() {
    cards.forEach((card) => {
        let rndNumber = Math.floor(Math.random() * 12);
        card.style.order = rndNumber;
    });
}

function flipCard() {
    if (disableCardFlipped) return;
    if (this === card1) return;
    totalFlips++;
    flips.innerText = totalFlips;
    this.classList.add('flip');
    if (!cardFlipped) {
        cardFlipped = true;
        card1 = this;
    } else {
        cardFlipped = false;
        card2 = this;
        checkCardMatch();
    }
}

function checkIfWin() {
    if (matchedArray.length === cards.length) {
        win();
    }
}

function checkCardMatch() {
    if (card1.dataset.name === card2.dataset.name) {
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);
        matchedArray.push(card1);
        matchedArray.push(card2);
        checkIfWin();
    } else {
        disableCardFlipped = true;
        setTimeout(function () {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            disableCardFlipped = false;
        }, 1200);
    }
}

function hideCards() {
    cards.forEach((card) => {
        card.classList.remove('flip');
    });
}

function timeCountDown() {
    timeRemening--;
    time.innerText = timeRemening;
    if (timeRemening === 0) {
        gameOver();
    }
}

function gameOver() {
    clearInterval(countdown);
    document.getElementById('game-over-text').classList.add('visible');
}

function win() {
    clearInterval(countdown);
    document.getElementById('win-text').classList.add('visible');
}