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

function dealCards() {
    /*for (let i = 0; i < playerList.length; i++) {
        for (let j = 0; j < cardsDealt.length; i++) {
            playerList[i].push(deck[j])
        }
    }*/
    burnPile.push(deck[0]);
    createNewDivWithClassAndId('burnPile', 'card', burnPile[0]);
    playerCards.push(deck[1]);
    createNewDivWithClassAndId('playerOneSquare', 'card', playerCards[0]);
    dealerCards.push(deck[2]);
    createNewDivWithClassAndId('dealerSquare', 'card', dealerCards[0]);
    playerCards.push(deck[3]);
    createNewDivWithClassAndId('playerOneSquare', 'card', playerCards[1]);
    dealerCards.push(deck[4]);
    createNewDivWithClassAndId('dealerSquare', 'card', dealerCards[1]);
}

function deal() {
    newDeckOfCards()
    dealCards();
    console.log(deck);
    console.log('player' + playerCards);
    console.log('dealer' + dealerCards);
    console.log('burner' + burnPile);
}

function hit() {
    
}

function stand() {

}

const dealButton = document.getElementById('dealButton');
dealButton.addEventListener("click", deal);

const hitButton = document.getElementById('hitButton');
hitButton.addEventListener("click", hit);

const standButton = document.getElementById('standButton');
standButton.addEventListener("click", stand);