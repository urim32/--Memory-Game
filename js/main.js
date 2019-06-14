let cards = document.querySelectorAll('.card');
let card1;
let card2;
let cardFlipped = false;
let disableCardFlipped = false;
cards.forEach((card) => card.addEventListener('click', flipCard));
(function shuffleCards() {
    cards.forEach((card) => {
        let rndNumber = Math.floor(Math.random() * 12);
        card.style.order = rndNumber;
    });
})();
function flipCard() {
    if (disableCardFlipped) return;
    if (this === card1) return;
    this.classList.add('flip');
    if (!cardFlipped) {
        // first click
        cardFlipped = true;
        card1 = this;
    } else {
        // second click
        cardFlipped = false;
        card2 = this;
        checkCardMatch();
    }
}
function checkCardMatch() {
    if (card1.dataset.name === card2.dataset.name) {
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);
    } else {
        disableCardFlipped = true;
        setTimeout(function() {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            disableCardFlipped = false;
        }, 1000);
    }
}
