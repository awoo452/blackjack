let shuffledDeck = [
    {card: "spadesA", points: 11},
    {card: "spades2", points: 2},
    {card: "spades3", points: 3},
    {card: "spades4", points: 4},
    {card: "spades5", points: 5},
    {card: "spades6", points: 6},
    {card: "spades7", points: 7},
    {card: "spades8", points: 8},
    {card: "spades9", points: 9},
    {card: "spades10", points: 10},
    {card: "spadesJ", points: 10},
    {card: "spadesQ", points: 10},
    {card: "spadesK", points: 10},
    {card: "clubsA", points: 11},
    {card: "clubs2", points: 2},
    {card: "clubs3", points: 3},
    {card: "clubs4", points: 4},
    {card: "clubs5", points: 5},
    {card: "clubs6", points: 6},
    {card: "clubs7", points: 7},
    {card: "clubs8", points: 8},
    {card: "clubs9", points: 9},
    {card: "clubs10", points: 10},
    {card: "clubsJ", points: 10},
    {card: "clubsQ", points: 10},
    {card: "clubsK", points: 10},
    {card: "diamondsA", points: 11},
    {card: "diamonds2", points: 2},
    {card: "diamonds3", points: 3},
    {card: "diamonds4", points: 4},
    {card: "diamonds5", points: 5},
    {card: "diamonds6", points: 6},
    {card: "diamonds7", points: 7},
    {card: "diamonds8", points: 8},
    {card: "diamonds9", points: 9},
    {card: "diamonds10", points: 10},
    {card: "diamondsJ", points: 10},
    {card: "diamondsQ", points: 10},
    {card: "diamondsK", points: 10},
    {card: "heartsA", points: 11},
    {card: "hearts2", points: 2},
    {card: "hearts3", points: 3},
    {card: "hearts4", points: 4},
    {card: "hearts5", points: 5},
    {card: "hearts6", points: 6},
    {card: "hearts7", points: 7},
    {card: "hearts8", points: 8},
    {card: "hearts9", points: 9},
    {card: "hearts10", points: 10},
    {card: "heartsJ", points: 10},
    {card: "heartsQ", points: 10},
    {card: "heartsK", points: 10},
]

let theDeck = [];


// Reset functions

function shuffleCards() {
    theDeck.length = 0;
    for (let i = 0; i < shuffledDeck.length; i++) {
    theDeck.push(shuffledDeck[i]);
    }
}

function reset() {
    leftInDeck = 52;
    playerCardCount = 0;
    dealerCardCount = 0;
    playerHand = 0;
    playerAceCount = 0;
    dealerAceCount = 0;
    dealerHand = 0;
    dealerHoleCard = 0;
    playerScore.textContent = playerHand;
    dealerScore.textContent = dealerHand;
    finalScore.textContent = "N/A";
    playerCard1.className = "";
    playerCard1.classList.add("playerCard1")
    playerCard1.classList.add("invisible")
    playerCard2.className = "";
    playerCard2.classList.add("playerCard2")
    playerCard2.classList.add("invisible")
    playerCard3.className = "";
    playerCard3.classList.add("playerCard3")
    playerCard3.classList.add("invisible")
    playerCard4.className = "";
    playerCard4.classList.add("playerCard4")
    playerCard4.classList.add("invisible")
    playerCard5.className = "";
    playerCard5.classList.add("playerCard5")
    playerCard5.classList.add("invisible")
    playerCard6.className = "";
    playerCard6.classList.add("playerCard6")
    playerCard6.classList.add("invisible")
    playerCard7.className = "";
    playerCard7.classList.add("playerCard7")
    playerCard7.classList.add("invisible")
    playerCard8.className = "";
    playerCard8.classList.add("playerCard8")
    playerCard8.classList.add("invisible")
    playerCard9.className = "";
    playerCard9.classList.add("playerCard9")
    playerCard9.classList.add("invisible")
    playerCard10.className = "";
    playerCard10.classList.add("playerCard10")
    playerCard10.classList.add("invisible")
    playerCard11.className = "";
    playerCard11.classList.add("playerCard11")
    playerCard11.classList.add("invisible")
    playerCard12.className = "";
    playerCard12.classList.add("playerCard12")
    playerCard12.classList.add("invisible")
    playerCard13.className = "";
    playerCard13.classList.add("playerCard13")
    playerCard13.classList.add("invisible")
    dealerCard1.className = "";
    dealerCard1.classList.add("dealerCard1")
    dealerCard1.classList.add("invisible")
    dealerCard2.className = "";
    dealerCard2.classList.add("dealerCard2")
    dealerCard2.classList.add("invisible")
    dealerCard3.className = "";
    dealerCard3.classList.add("dealerCard3")
    dealerCard3.classList.add("invisible")
    dealerCard4.className = "";
    dealerCard4.classList.add("dealerCard4")
    dealerCard4.classList.add("invisible")
    dealerCard5.className = "";
    dealerCard5.classList.add("dealerCard5")
    dealerCard5.classList.add("invisible")
    dealerCard6.className = "";
    dealerCard6.classList.add("dealerCard6")
    dealerCard6.classList.add("invisible")
    dealerCard7.className = "";
    dealerCard7.classList.add("dealerCard7")
    dealerCard7.classList.add("invisible")
    dealerCard8.className = "";
    dealerCard8.classList.add("dealerCard8")
    dealerCard8.classList.add("invisible")
    dealerCard9.className = "";
    dealerCard9.classList.add("dealerCard9")
    dealerCard9.classList.add("invisible")
    dealerCard10.className = "";
    dealerCard10.classList.add("dealerCard10")
    dealerCard10.classList.add("invisible")
    dealerCard11.className = "";
    dealerCard11.classList.add("dealerCard11")
    dealerCard11.classList.add("invisible")
    dealerCard12.className = "";
    dealerCard12.classList.add("dealerCard12")
    dealerCard12.classList.add("invisible")
    dealerCard13.className = "";
    dealerCard13.classList.add("dealerCard13")
    dealerCard13.classList.add("invisible")
}


// Deal button functions

var leftInDeck = 52;

var playerScore = document.querySelector("#playerScore");
var playerHand = 0;
var playerAceCount = 0;
let playerCardCount = 0;

var dealerScore = document.querySelector("#dealerScore");
var dealerHand = 0;
var dealerAceCount = 0;
let dealerCardCount = 0;
let dealerHoleCard = 0;
let dealerBlackJack = false;

const randomNum = () => {
    return Math.floor(Math.random() * leftInDeck);
}

const firstCard = (whichPlayerCard) => {
    whichPlayerCard.classList.remove("invisible")
    const rn1 = randomNum();
    whichPlayerCard.classList.add(theDeck[rn1].card);
    if (theDeck[rn1].points === 11) {
        playerAceCount += 1;
    }
    playerHand += theDeck[rn1].points;
    theDeck.splice(rn1, 1);
    leftInDeck -= 1;
}

const secondCard = (whichDealerCard) => {
    whichDealerCard.classList.remove("invisible")
    const rn2 = randomNum();
    whichDealerCard.classList.add('flippedCard');
    whichDealerCard.classList.add(theDeck[rn2].card);
    if (theDeck[rn2].points === 11) {
        dealerAceCount += 1;
    }
    dealerHoleCard += theDeck[rn2].points;
    theDeck.splice(rn2, 1);
    leftInDeck -= 1;
}

const thirdCard = (whichPlayerCard) => {
    whichPlayerCard.classList.remove("invisible")
    const rn3 = randomNum();
    whichPlayerCard.classList.add(theDeck[rn3].card);
    if (theDeck[rn3].points === 11) {
        if (playerAceCount > 1) {
            playerHand -= 10;
            playerAceCount -= 1;
        }
        playerAceCount += 1;
    }
    playerHand += theDeck[rn3].points;
    theDeck.splice(rn3, 1);
    leftInDeck -= 1;
}

const fourthCard = (whichDealerCard) => {
    whichDealerCard.classList.remove("invisible")
    const rn4 = randomNum();
    whichDealerCard.classList.add(theDeck[rn4].card);
    if (theDeck[rn4].points === 11) {
        dealerAceCount += 1;
    }
    dealerHand += theDeck[rn4].points;
    theDeck.splice(rn4, 1);
    leftInDeck -= 1;
}

function deal() {
    shuffleCards();
    if (playerCardCount === 0) {
    playerCardCount += 2;
    dealerCardCount += 2;
    firstCard(playerCard1);
    secondCard(dealerCard1);
    thirdCard(playerCard2);
    fourthCard(dealerCard2);
    playerScore.textContent = playerHand;
    dealerScore.textContent = dealerHand;
    if (playerHand === 21 && dealerHand === 21) {
        whoWon();
    }
    if (playerHand === 21) {
        playerScore.textContent = 'BlackJack!';
        whoWon();
        }
    if (dealerHand + dealerHoleCard === 21) {
            dealerScore.textContent = 'BlackJack!';
            dealerBlackJack = true;
            whoWon();
    }
    } else {
        alert('Error');
        reset();
    }
    
}


// Hit button functions

var anothaOne = (whichPlayerCard) => {
    if (playerHand > 21) {
        alert("Error!")
        reset();
    } else {
        whichPlayerCard.classList.remove("invisible");
        const rn = randomNum();
        whichPlayerCard.classList.add(theDeck[rn].card);
        if (theDeck[rn].points === 11) {
            playerAceCount += 1;
        }
        playerHand += theDeck[rn].points;
        playerScore.textContent = playerHand;
        theDeck.splice(rn, 1);
        leftInDeck -= 1;
        if (playerHand > 21) {
        if (playerAceCount > 0) {
                playerHand -= 10;
                playerAceCount -= 1;
                playerScore.textContent = playerHand;
            } else {
                playerScore.textContent = "Bust!";
                whoWon();
            }
        }
    }
}


function hit() {
        playerCardCount += 1;
        if (playerCardCount === 3) {
            anothaOne(playerCard3);
        } else if (playerCardCount === 4) {
            anothaOne(playerCard4);
        } else if (playerCardCount === 5) {
            anothaOne(playerCard5);
        } else if (playerCardCount === 6) {
            anothaOne(playerCard6);
        } else if (playerCardCount === 7) {
            anothaOne(playerCard7);
        } else if (playerCardCount === 8) {
            anothaOne(playerCard8);
        } else if (playerCardCount === 9) {
            anothaOne(playerCard9);
        } else if (playerCardCount === 10) {
            anothaOne(playerCard10);
        } else if (playerCardCount === 11) {
            anothaOne(playerCard11);
        } else if (playerCardCount === 12) {
            anothaOne(playerCard12)
        } else if (playerCardCount === 13) {
            anothaOne(playerCard13);
    }
}


//Stand button functions

var bustPlease = (whichDealerCard) => {
    if (dealerHand < 17) {
        whichDealerCard.classList.remove("invisible");
        const rn = randomNum();
        whichDealerCard.classList.add(theDeck[rn].card);
            if (theDeck[rn].points === 11) {
                dealerAceCount += 1;
            }
        dealerHand += theDeck[rn].points;
        dealerScore.textContent = dealerHand;
        theDeck.splice(rn, 1);
        leftInDeck -= 1;
        dealerCardCount += 1;
        stand();
    } else if (dealerHand === 17) {
        if (dealerAceCount > 0) {
            whichDealerCard.classList.remove("invisible");
            const rn = randomNum();
            whichDealerCard.classList.add(theDeck[rn].card);
            if (theDeck[rn].points === 11) {
                dealerAceCount += 1;
            }
            dealerHand += theDeck[rn].points;
            dealerScore.textContent = dealerHand;
            theDeck.splice(rn, 1);
            leftInDeck -= 1;
            dealerCardCount += 1;
            stand();
        } else {
            whoWon();
        }
    } else if (dealerHand > 17 && dealerHand <=21) {
        whoWon();
    } else if (dealerHand > 21) {
        if (dealerAceCount > 0) {
            dealerAceCount -= 1;
            dealerHand -= 10;
            dealerScore.textContent = dealerHand;
            stand();
        } else if (dealerHand > 21) {
        dealerScore.textContent = "Bust!";
        whoWon();
        }
    }
}
   
function stand() {
    if (playerHand > 21) {
        alert("Error!")
        reset();
    } else{
        dealerHand += dealerHoleCard;
        dealerHoleCard = 0;
        dealerCard1.classList.remove("flippedCard");
        dealerScore.textContent = dealerHand;
        if (dealerCardCount === 2) {
            bustPlease(dealerCard3);
        } else if (dealerCardCount === 3) {
            bustPlease(dealerCard4);
        } else if (dealerCardCount === 4) {
            bustPlease(dealerCard5);
        } else if (dealerCardCount === 5) {
            bustPlease(dealerCard6);
        } else if (dealerCardCount === 6) {
            bustPlease(dealerCard7);
        } else if (dealerCardCount === 7) {
            bustPlease(dealerCard8);
        } else if (dealerCardCount === 8) {
            bustPlease(dealerCard9);
        } else if (dealerCardCount === 9) {
            bustPlease(dealerCard10);
        } else if (dealerCardCount === 10) {
            bustPlease(dealerCard11);
        } else if (dealerCardCount === 11) {
            bustPlease(dealerCard12);
        } else if (dealerCardCount === 12) {
            bustPlease(dealerCard13);
        }
    }
}


//Who Won
function whoWon() {
    dealerCard1.classList.remove("flippedCard")
    dealerHand += dealerHoleCard;
    dealerHoleCard = 0;
    if (dealerBlackJack = false) {
        dealerScore.textContent = dealerHand;
    }
    if (playerHand > 21) {
        finalScore.textContent = "Loser";
    } 
    
    if (dealerHand > 21) {
        finalScore.textContent = "Winner";
    }

    if (playerHand <=21 && dealerHand <= 21) {
        if (playerHand > dealerHand) {
        finalScore.textContent = "Winner";
        } else if (playerHand === dealerHand) {
            finalScore.textContent = "Push";
        } else if (playerHand < dealerHand) {
            finalScore.textContent = "Loser";
        }
    }
}