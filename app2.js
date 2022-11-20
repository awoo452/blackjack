const randomNumberBetweenZeroAnd = (i) => Math.floor(Math.random() * i);

function createNewDiv(parent) {
    let whereItGoes = document.getElementById(parent);
    let newDiv = document.createElement('div');
    whereItGoes.appendChild(newDiv);
}

function createNewDivWithId(parent, whichId) {
    let whereItGoes = document.getElementById(parent);
    let newDiv = document.createElement('div');
    whereItGoes.appendChild(newDiv).setAttribute('id', whichId);
}

function createNewDivWithClassAndId(parent, whichClass, whichId) {
    let whereItGoes = document.getElementById(parent);
    let newDiv = document.createElement('div');
    whereItGoes.appendChild(newDiv).setAttribute('id', whichId);
    document.getElementById(whichId).classList.add(whichClass);
}

const cards = [
    'joker',
    'ace',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'jack',
    'queen',
    'king'
]

const numberOfCardsInTheDeck = 52

function cardDecider() {
    let value = randomNumberBetweenZeroAnd(cards.length)
    if (value === 0) {
        value += 1; //This removes the joker from the deck, there's a better way to do this.
    }
    return cards[value];
}

const suit = [
    'Hearts',
    'Spades',
    'Diamonds',
    'Clubs'
]

function suitDecider() {
    let value = randomNumberBetweenZeroAnd(suit.length);
    return suit[value];
}

let deck = []

let reject = false;

function addCardToDeck() {
    let card = cardDecider() + 'Of' + suitDecider();
    if (deck.includes(card)) {
        reject = true;
    }
    if (reject == false) {
    deck.push(card);
    }
    reject = false;
}

function newDeckOfCards() {
    do {
        addCardToDeck();
    } while (deck.length < numberOfCardsInTheDeck);
}

let burnPile = [];
let dealerCards = [];
let playerCards = [];

let playerList = [
    burnPile,
    playerCards,
    dealerCards
]

let cardsDealt = 0;
let cardsDealtToDealer = 0;
let cardsDealtToPlayer = 0;
let cardsBurned = 0;

function addSomeCardsToTheBurnPile(howMany) {
    let magic = cardsBurned + howMany
    do {
        burnPile.push(deck[cardsDealt]);
        createNewDivWithClassAndId('burnPile', 'card', burnPile[cardsBurned]);
        cardsDealt += 1;
        cardsBurned += 1;
    } while (cardsBurned < magic);
}

function addSomeCardsToPlayerOne(howMany) {
    let magic = cardsDealtToPlayer + howMany;
    do {
        playerCards.push(deck[cardsDealt]);
        createNewDivWithClassAndId('playerOneSquare', 'card', playerCards[cardsDealtToPlayer]);
        cardsDealt += 1;
        cardsDealtToPlayer += 1;
    } while (cardsDealtToPlayer < magic);
}

function addSomeCardsToDealer(howMany) {
    let magic = cardsDealtToDealer + howMany;
    do {
    dealerCards.push(deck[cardsDealt]);
    createNewDivWithClassAndId('dealerSquare', 'card', dealerCards[cardsDealtToDealer]);
    cardsDealt += 1;
    cardsDealtToDealer += 1;
    } while (cardsDealtToDealer < magic)
}

function dealCards() {
    addSomeCardsToTheBurnPile(1);
    addSomeCardsToPlayerOne(1);
    addSomeCardsToDealer(1);
    addSomeCardsToPlayerOne(1);
    addSomeCardsToDealer(1);
}

let playerHit = null;

function deal() {
    newDeckOfCards()
    dealCards();
    console.log(deck);
    console.log('player' + playerCards);
    console.log('dealer' + dealerCards);
    console.log('burner' + burnPile);
}


function hit() {
    addSomeCardsToPlayerOne(1);
}

function stand() {

}

const dealButton = document.getElementById('dealButton');
dealButton.addEventListener("click", deal);

const hitButton = document.getElementById('hitButton');
hitButton.addEventListener("click", hit);

const standButton = document.getElementById('standButton');
standButton.addEventListener("click", stand);