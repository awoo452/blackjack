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

function cardDecider() {
    let value = randomNumberBetweenZeroAnd(cards.length)
    if (value === 0) {
        value += 1; //This removes the joker from the deck, there's a better way to do this.
    }
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
        for (let i = 0; i < cardsDealtToPlayer; i++) {
            
        }
        //select all divs in the player box and += i em to each
        //https://bobbyhadz.com/blog/javascript-get-nth-child-of-element
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
}


function hit() {
    addSomeCardsToPlayerOne(1);
}

function stand() {
    //do {addSomeCardsToDealer()} while (dealerScore < 17);
}

const dealButton = document.getElementById('dealButton');
dealButton.addEventListener("click", deal);

const hitButton = document.getElementById('hitButton');
hitButton.addEventListener("click", hit);

const standButton = document.getElementById('standButton');
standButton.addEventListener("click", stand);