# Blackjack

Browser-based Blackjack game. Static front-end only (no Rails/backend). Hosted via AWS Amplify.

## Getting Started

1. Open `index.html` in a browser.
1. For reliable asset loading, run a simple static server from the project root and open the served page.

## Documentation

This README is the docs for the app.

### Gameplay rules
- Standard 52-card deck. Face cards are 10, aces are 1 or 11.
- Dealer stands on 17 and reveals the hole card when you stand or bust.
- Dealer draws until reaching 17 or busting.

### Controls
- Deal places the selected bet and starts the round.
- Hit draws a card until you stand or bust.
- Stand ends your turn and lets the dealer finish.
- Double Down is available before you hit; it adds the same bet, deals one card, then stands.
- Reset clears the table for a new round.

### Bets and payouts
- Bets adjust in 25-chip steps.
- Win pays 2x the placed bet, push returns the bet, loss forfeits it.
- Chips reset to 500 on page refresh.

## Changelog

See `CHANGELOG.md` for notable changes.
