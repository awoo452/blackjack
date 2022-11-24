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

function addIdToDiv(whichDiv, WhichId) {
    let divToAddTo = document.querySelector(whichDiv);
    divToAddTo.setAttribute('id', WhichId);
}

const cards = [
    {card: 'joker', points: 1},
    {card: 'ace', points: 11},
    {card: 'two', points: 2},
    {card: 'three', points: 3},
    {card: 'four', points: 4},
    {card: 'five', points: 5},
    {card: 'six', points: 6},
    {card: 'seven', points: 7},
    {card: 'eight', points: 8},
    {card: 'nine', points: 9},
    {card: 'ten', points: 10},
    {card: 'jack', points: 10},
    {card: 'queen', points: 10},
    {card: 'king', points: 10}
]

const numberOfCardsInTheDeck = 52
let points = null;

function cardDecider() {
    let value = randomNumberBetweenZeroAnd(cards.length)
    if (value === 0) {
        value += 1; //This removes the joker from the deck, there's a better way to do this.
    }
    points = cards[value].points;
    return cards[value].card;
    
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

let deck = [];

let reject = false;

function addCardToDeck() {
    let card = cardDecider() + 'Of' + suitDecider();
    if (deck.includes(card)) {
        reject = true;
    }
    if (reject == false) {
    deck.push({card, points});
    }
    reject = false;
}

function newDeckOfCards() {
    do {
        addCardToDeck();
    } while (deck.length < numberOfCardsInTheDeck);
    console.log(deck);
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
        burnPile.push(deck[cardsDealt].card);
        createNewDivWithClassAndId('burnPile', 'card', burnPile[cardsBurned]);
        cardsDealt += 1;
        cardsBurned += 1;
    } while (cardsBurned < magic);
}

let playerScore = document.querySelector("#playerScore");
let playerScoreCount = 0

function addSomeCardsToPlayerOne(howMany) {
    do {
        playerCards.push(deck[cardsDealt].card);
        playerScoreCount += deck[cardsDealt].points;
        playerScore.textContent = playerScoreCount.toString();
        createNewDivWithClassAndId('playerOneSquare', 'card', playerCards[cardsDealtToPlayer]);
        cardsDealt += 1;
        cardsDealtToPlayer += 1;
    } while (cardsDealtToPlayer + howMany < playerCards.length);
}

let dealerScore = document.querySelector('#dealerScore');
let dealerScoreCount = 0;

function addSomeCardsToDealer(howMany) {
    do {
    dealerCards.push(deck[cardsDealt].card);
    dealerScoreCount += deck[cardsDealt].points;
    dealerScore.textContent = dealerScoreCount.toString();
    createNewDivWithClassAndId('dealerSquare', 'card', dealerCards[cardsDealtToDealer]);
    cardsDealt += 1;
    cardsDealtToDealer += 1;
    } while (cardsDealtToDealer + howMany < dealerCards.length);
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
}


function hit() {
    addSomeCardsToPlayerOne(1);
}

function stand() {
    addSomeCardsToDealer(1);
}



const dealButton = document.getElementById('dealButton');
dealButton.addEventListener("click", deal);

const hitButton = document.getElementById('hitButton');
hitButton.addEventListener("click", hit);

const standButton = document.getElementById('standButton');
standButton.addEventListener("click", stand);