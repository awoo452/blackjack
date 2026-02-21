(() => {
  'use strict';

  const BET_STEP = 25;
  const INITIAL_CHIPS = 500;
  const DEALER_STAND_MIN = 17;
  const FACE_DOWN_ID = 'faceDown';

  const RANKS = [
    { name: 'ace', points: 11, isAce: true },
    { name: 'two', points: 2 },
    { name: 'three', points: 3 },
    { name: 'four', points: 4 },
    { name: 'five', points: 5 },
    { name: 'six', points: 6 },
    { name: 'seven', points: 7 },
    { name: 'eight', points: 8 },
    { name: 'nine', points: 9 },
    { name: 'ten', points: 10 },
    { name: 'jack', points: 10 },
    { name: 'queen', points: 10 },
    { name: 'king', points: 10 },
  ];

  const SUITS = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];

  const state = {
    deck: [],
    burn: [],
    player: {
      hand: [],
      score: 0,
      hasStood: false,
      hasHit: false,
    },
    dealer: {
      hand: [],
      score: 0,
    },
    bets: {
      selected: 0,
      placed: 0,
      chips: INITIAL_CHIPS,
    },
    dealt: false,
    roundOver: false,
  };

  let el = {};

  function cacheElements() {
    el = {
      playerScore: document.querySelector('#playerScore'),
      dealerScore: document.querySelector('#dealerScore'),
      finalScore: document.querySelector('#finalScore'),
      playerContainer: document.getElementById('playerOneCardContainer'),
      dealerContainer: document.getElementById('dealerContainer'),
      burnPile: document.getElementById('burnedPile'),
      betValue: document.getElementById('howMuchWillPlayerOneBet'),
      totalBet: document.getElementById('totalChipsBet'),
      totalChips: document.getElementById('totalChipsPlayerOne'),
      dealButton: document.getElementById('dealButton'),
      hitButton: document.getElementById('hitButton'),
      standButton: document.getElementById('standButton'),
      resetButton: document.getElementById('resetButton'),
      doubleDownButton: document.getElementById('doubleDown'),
      increaseBetButton: document.getElementById('increaseTheBet'),
      decreaseBetButton: document.getElementById('decreaseTheBet'),
    };
  }

  function bindEvents() {
    el.dealButton.addEventListener('click', deal);
    el.hitButton.addEventListener('click', hit);
    el.standButton.addEventListener('click', stand);
    el.resetButton.addEventListener('click', resetTable);
    el.doubleDownButton.addEventListener('click', doubleDown);
    el.increaseBetButton.addEventListener('click', increaseBet);
    el.decreaseBetButton.addEventListener('click', decreaseBet);
  }

  function init() {
    cacheElements();
    bindEvents();
    resetTable();
    updateBetDisplays();
  }

  window.addEventListener('load', init);

  function updateBetDisplays() {
    el.betValue.textContent = state.bets.selected.toString();
    el.totalBet.textContent = state.bets.placed.toString();
    el.totalChips.textContent = state.bets.chips.toString();
  }

  function setSelectedBet(amount) {
    const clamped = Math.max(0, Math.min(amount, state.bets.chips));
    state.bets.selected = clamped;
    updateBetDisplays();
  }

  function increaseBet() {
    if (state.dealt) return;
    setSelectedBet(state.bets.selected + BET_STEP);
  }

  function decreaseBet() {
    if (state.dealt) return;
    setSelectedBet(state.bets.selected - BET_STEP);
  }

  function placeBet() {
    if (state.bets.selected <= 0) return false;
    if (state.bets.selected > state.bets.chips) return false;
    state.bets.chips -= state.bets.selected;
    state.bets.placed += state.bets.selected;
    updateBetDisplays();
    return true;
  }

  function buildDeck() {
    const deck = [];
    for (const suit of SUITS) {
      for (const rank of RANKS) {
        deck.push({
          id: `${rank.name}Of${suit}`,
          points: rank.points,
          isAce: Boolean(rank.isAce),
        });
      }
    }
    return shuffle(deck);
  }

  function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  function drawCard() {
    return state.deck.pop();
  }

  function clearContainer(container) {
    while (container.firstChild) {
      container.removeChild(container.lastChild);
    }
  }

  function renderCard(container, cardId) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('id', cardId);
    container.appendChild(card);
    return card;
  }

  function burnCards(count) {
    for (let i = 0; i < count; i += 1) {
      const card = drawCard();
      if (!card) return;
      state.burn.push(card);
      renderCard(el.burnPile, card.id);
      if (el.burnPile.firstElementChild) {
        el.burnPile.firstElementChild.setAttribute('id', FACE_DOWN_ID);
      }
    }
  }

  function dealToPlayer(count) {
    for (let i = 0; i < count; i += 1) {
      const card = drawCard();
      if (!card) return;
      state.player.hand.push(card);
      renderCard(el.playerContainer, card.id);
    }
  }

  function dealToDealer(count, { faceDownFirst = false } = {}) {
    for (let i = 0; i < count; i += 1) {
      const card = drawCard();
      if (!card) return;
      state.dealer.hand.push(card);
      renderCard(el.dealerContainer, card.id);
    }
    if (faceDownFirst && el.dealerContainer.firstElementChild) {
      el.dealerContainer.firstElementChild.setAttribute('id', FACE_DOWN_ID);
    }
  }

  function calculateHandScore(hand) {
    let total = 0;
    let aceCount = 0;
    for (const card of hand) {
      total += card.points;
      if (card.isAce) aceCount += 1;
    }
    while (total > 21 && aceCount > 0) {
      total -= 10;
      aceCount -= 1;
    }
    return total;
  }

  function calculateVisibleDealerScore() {
    if (state.dealer.hand.length <= 1) return 0;
    return calculateHandScore(state.dealer.hand.slice(1));
  }

  function updateScores({ revealDealer = false } = {}) {
    state.player.score = calculateHandScore(state.player.hand);
    state.dealer.score = calculateHandScore(state.dealer.hand);

    el.playerScore.textContent = state.player.score.toString();
    const dealerScore = revealDealer
      ? state.dealer.score
      : calculateVisibleDealerScore();
    el.dealerScore.textContent = dealerScore.toString();
  }

  function revealDealerHoleCard() {
    const firstCard = el.dealerContainer.firstElementChild;
    if (firstCard && state.dealer.hand[0]) {
      firstCard.setAttribute('id', state.dealer.hand[0].id);
    }
  }

  function deal() {
    if (state.dealt) return;
    if (!placeBet()) {
      const message = state.bets.selected <= 0 ? 'Select a bet' : 'Not enough chips';
      alert(message);
      return;
    }

    state.deck = buildDeck();
    state.dealt = true;
    state.roundOver = false;

    burnCards(1);
    dealToPlayer(1);
    dealToDealer(1, { faceDownFirst: true });
    dealToPlayer(1);
    dealToDealer(1);

    updateScores();

    if (state.dealer.score === 21) {
      endRound();
    }
  }

  function hit() {
    if (!state.dealt || state.player.hasStood || state.roundOver) return;
    dealToPlayer(1);
    state.player.hasHit = true;
    updateScores();
    if (state.player.score > 21) {
      stand();
    }
  }

  function stand() {
    if (!state.dealt || state.player.hasStood || state.roundOver) return;
    state.player.hasStood = true;
    revealDealerHoleCard();
    updateScores({ revealDealer: true });

    while (state.dealer.score < DEALER_STAND_MIN) {
      dealToDealer(1);
      updateScores({ revealDealer: true });
    }

    endRound();
  }

  function doubleDown() {
    if (!state.dealt || state.player.hasStood || state.roundOver) return;
    if (state.player.hasHit) return;
    if (state.bets.selected <= 0) return;
    if (state.bets.chips < state.bets.selected) {
      alert('Not enough chips');
      return;
    }
    placeBet();
    dealToPlayer(1);
    state.player.hasHit = true;
    updateScores();
    stand();
  }

  function endRound() {
    if (state.roundOver) return;
    state.roundOver = true;
    state.player.hasStood = true;

    revealDealerHoleCard();
    updateScores({ revealDealer: true });

    const playerScore = state.player.score;
    const dealerScore = state.dealer.score;

    if (playerScore > 21) {
      el.finalScore.textContent = 'dealer wins because player one busted';
    } else if (dealerScore > 21) {
      el.finalScore.textContent = 'player one wins because dealer busted';
      state.bets.chips += state.bets.placed * 2;
    } else if (dealerScore > playerScore) {
      el.finalScore.textContent = 'dealer wins because dealer has a better hand';
    } else if (dealerScore === playerScore) {
      el.finalScore.textContent = 'push';
      state.bets.chips += state.bets.placed;
    } else {
      el.finalScore.textContent = 'player one wins because player one has a better hand';
      state.bets.chips += state.bets.placed * 2;
    }

    updateBetDisplays();
  }

  function resetTable() {
    state.deck = [];
    state.burn = [];
    state.player.hand = [];
    state.player.score = 0;
    state.player.hasStood = false;
    state.player.hasHit = false;
    state.dealer.hand = [];
    state.dealer.score = 0;
    state.dealt = false;
    state.roundOver = false;

    state.bets.selected = 0;
    state.bets.placed = 0;

    clearContainer(el.playerContainer);
    clearContainer(el.dealerContainer);
    clearContainer(el.burnPile);

    el.playerScore.textContent = '0';
    el.dealerScore.textContent = '0';
    el.finalScore.textContent = '';

    updateBetDisplays();
  }
})();
