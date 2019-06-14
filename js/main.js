let cards = document.querySelectorAll('.card');
let card1;
let card2;
let cardFlipped = false;
cards.forEach((card) => card.addEventListener('click', flipCard));
function flipCard() {
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
        setTimeout(function() {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
        }, 1000);
    }
}
