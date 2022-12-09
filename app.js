const randomNumberBetweenZeroAnd = (i) => Math.floor(Math.random() * i);

function createNewDivWithClassAndId(parent, whichClass, whichId,) {
    let whereItGoes = document.getElementById(parent);
    let newDiv = document.createElement('div');
    whereItGoes.appendChild(newDiv).setAttribute('id', whichId);
    document.getElementById(whichId).classList.add(whichClass);
}

window.onload = reset;

let selectTheBet = 0
const howMuchWillPlayerOneBet = document.getElementById('howMuchWillPlayerOneBet')
howMuchWillPlayerOneBet.textContent = selectTheBet.toString();

function decreaseTheBet() {
    if (selectTheBet > 0) {
    selectTheBet -= 25;
    howMuchWillPlayerOneBet.textContent = selectTheBet.toString();
    }
}
const decreaseTheBetButton = document.getElementById('decreaseTheBet')
decreaseTheBetButton.addEventListener("click", decreaseTheBet)

function increaseTheBet() {
    if (selectTheBet < howManyChipsDoesPlayerOneHave) {
    selectTheBet += 25;
    howMuchWillPlayerOneBet.textContent = selectTheBet.toString();
    }
}
const increaseTheBetButton = document.getElementById('increaseTheBet')
increaseTheBetButton.addEventListener("click", increaseTheBet)

let howManyChipsDoesPlayerOneHave = 500;
const totalChipsPlayerOne = document.getElementById('totalChipsPlayerOne');
totalChipsPlayerOne.textContent = howManyChipsDoesPlayerOneHave.toString();

let howManyChipsDidPlayerOneBet = 0;
const totalChipsBet = document.getElementById('totalChipsBet');
totalChipsBet.textContent = howManyChipsDidPlayerOneBet.toString();

function takeTheBet() {
    howManyChipsDoesPlayerOneHave -= selectTheBet;
    howManyChipsDidPlayerOneBet += selectTheBet;
    totalChipsPlayerOne.textContent = howManyChipsDoesPlayerOneHave.toString();
    totalChipsBet.textContent = howManyChipsDidPlayerOneBet.toString();
}

const cards = [
    {card: 'joker', points: 'over 9000'},
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

let reject = null;

function addCardToDeck() {
    let card = cardDecider() + 'Of' + suitDecider();
    if (deck.some(e => e.card === card)) {
        reject = true;
    }
    if (reject != true) {
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
let playerOneCards = [];

let cardsDealt = 0;
let cardsDealtToDealer = 0;
let cardsDealtToPlayerOne = 0;
let cardsBurned = 0;

function addSomeCardsToTheBurnPile(howMany) {
    do {
        burnPile.push(deck[cardsDealt].card);
        createNewDivWithClassAndId('burnedPile', 'card', burnPile[cardsBurned]);
        document.getElementById('burnedPile').firstChild.setAttribute('id', 'faceDown');
        cardsDealt += 1;
        cardsBurned += 1;
    } while (cardsBurned + howMany < burnPile.length);
}

let playerScore = document.querySelector("#playerScore");
let playerScoreCount = 0

function addSomeCardsToPlayerOne(howMany) {
    do {
        if (deck[cardsDealt].points === 11) {
            playerAceCount += 1;
        }
        playerOneCards.push(deck[cardsDealt].card);
        playerScoreCount += deck[cardsDealt].points;
        if (playerScoreCount > 21 && playerAceCount >= 1) {
            playerScoreCount -= 10;
            playerAceCount -= 1;
        }
        playerScore.textContent = playerScoreCount.toString();
        createNewDivWithClassAndId('playerOneCardContainer', 'card', playerOneCards[cardsDealtToPlayerOne]);
        cardsDealt += 1;
        cardsDealtToPlayerOne += 1;
        if (playerScoreCount > 21) {
            stand();
        }
    } while (cardsDealtToPlayerOne + howMany < playerOneCards.length);
}

let dealerScore = document.querySelector('#dealerScore');
let dealerScoreCount = 0;
let publicFacingDealerScoreCount = 0;

function addSomeCardsToDealer(howMany) {
    do {
        if (deck[cardsDealt].points === 11) {
            dealerAceCount += 1;
        }
        dealerCards.push(deck[cardsDealt].card);
        dealerScoreCount += deck[cardsDealt].points;
        if (dealerCards.length === 1) {
            publicFacingDealerScoreCount += 0;
        } else {
            publicFacingDealerScoreCount +=deck[cardsDealt].points;
        }
        if (dealerScoreCount > 21 && dealerAceCount >= 1) {
            dealerScoreCount -= 10;
            dealerAceCount -= 1;
        }
        dealerScore.textContent = publicFacingDealerScoreCount.toString();
        createNewDivWithClassAndId('dealerContainer', 'card', dealerCards[cardsDealtToDealer]);
        document.getElementById('dealerContainer').firstChild.setAttribute('id', 'faceDown');
        cardsDealt += 1;
        cardsDealtToDealer += 1;
    } while (cardsDealtToDealer + howMany < dealerCards.length);
}

let dealt = null;
let playerAceCount = 0;
let dealerAceCount = 0;

function dealCards() {
    /*//need to add something to freeze the ability to hit a card while these timeouts are happening
    setTimeout(function() { addSomeCardsToTheBurnPile(1) }, 250);
    setTimeout(function() { addSomeCardsToPlayerOne(1) }, 500);
    setTimeout(function() { addSomeCardsToDealer(1) }, 750);
    setTimeout(function() { addSomeCardsToPlayerOne(1) }, 1000);
    setTimeout(function() { addSomeCardsToDealer(1) }, 1250);
    //need to add something here to calculate if the dealer got a 21 & auto end game / push if so
    dealt = true;*/
    takeTheBet();
    addSomeCardsToTheBurnPile(1);
    addSomeCardsToPlayerOne(1);
    addSomeCardsToDealer(1);
    addSomeCardsToPlayerOne(1);
    addSomeCardsToDealer(1);
    dealt = true;
}

function deal() {
    if (dealt != true && selectTheBet != 0) {
    newDeckOfCards()
    dealCards();
    } else if (selectTheBet == 0) {
        alert('Select a bet');
    }
    if (dealerScoreCount === 21 && publicFacingDealerScoreCount === 10) {
        whoWon();
    }   else if (dealerScoreCount === 21 && publicFacingDealerScoreCount === 11) {
        //askForInsurance
        whoWon();
    }
}

didPlayerOneStand = null;

function hit() {
    if (didPlayerOneStand != true && playerScoreCount <= 21) {
        setTimeout(function() { addSomeCardsToPlayerOne(1) }, 250);
    }
}

dealerBusted = null;
playerBusted = null;
let finalScore = document.querySelector('#finalScore');

function whoWon() {
    document.getElementById('dealerContainer').firstChild.setAttribute('id', dealerCards[0]);
    dealerScore.textContent = dealerScoreCount.toString();
    if (dealerScoreCount > 21) {
        dealerBusted = true;
    }
    if (playerScoreCount > 21) {
        playerBusted = true;
    }
    if (playerBusted == true) {
        finalScore.textContent = 'dealer wins because player one busted';
    } else if (dealerBusted == true && playerBusted != true) {
        finalScore.textContent = 'player one wins because dealer busted';
        howManyChipsDoesPlayerOneHave += howManyChipsDidPlayerOneBet * 2;
        totalChipsPlayerOne.textContent = howManyChipsDoesPlayerOneHave.toString();
    } else if (dealerScoreCount > playerScoreCount) {
        finalScore.textContent = 'dealer wins because dealer has a better hand';
    } else if (dealerScoreCount == playerScoreCount) {
        finalScore.textContent = 'push';
        howManyChipsDoesPlayerOneHave += howManyChipsDidPlayerOneBet;
        totalChipsPlayerOne.textContent = howManyChipsDoesPlayerOneHave.toString();
    } else if (dealerScoreCount < playerScoreCount) {
        finalScore.textContent = 'player one wins because player one has a better hand';
        howManyChipsDoesPlayerOneHave += howManyChipsDidPlayerOneBet * 2;
        totalChipsPlayerOne.textContent = howManyChipsDoesPlayerOneHave.toString();
    }
}

function stand() {
    didPlayerOneStand = true;
    if (dealerScoreCount < 17) {
        do {addSomeCardsToDealer(1)} while (dealerScoreCount < 17)}
        //need to figure out a set interval / timeout
    whoWon();
}

function reset() {
    points = null;
    deck = [];
    reject = null;
    playerAceCount = 0;
    dealerAceCount = 0;
    burnPile = [];
    dealerCards = [];
    playerOneCards = [];
    cardsDealt = 0;
    cardsDealtToDealer = 0;
    cardsDealtToPlayerOne = 0;
    cardsBurned = 0;
    playerScoreCount = 0;
    dealerScoreCount = 0;
    publicFacingDealerScoreCount = 0;
    dealt = null;
    didPlayerOneStand = null;
    dealerBusted = null;
    playerBusted = null;
    selectTheBet = 0;
    howMuchWillPlayerOneBet.textContent = selectTheBet.toString();
    howManyChipsDidPlayerOneBet = 0;
    totalChipsBet.textContent = howManyChipsDidPlayerOneBet.toString();
    while (playerOneCardContainer.hasChildNodes()) {
        playerOneCardContainer.removeChild(playerOneCardContainer.lastChild);
    }
    while (dealerContainer.hasChildNodes()) {
    dealerContainer.removeChild(dealerContainer.lastChild);
    }
    while (burnedPile.hasChildNodes()) {
        burnedPile.removeChild(burnedPile.lastChild);
    }
    dealerScore.textContent = '0';
    playerScore.textContent = '0';
    finalScore.textContent = '';
}

const dealButton = document.getElementById('dealButton');
dealButton.addEventListener("click", deal);

const hitButton = document.getElementById('hitButton');
hitButton.addEventListener("click", hit);

const standButton = document.getElementById('standButton');
standButton.addEventListener("click", stand);

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener("click", reset);





