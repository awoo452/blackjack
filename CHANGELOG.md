# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.

## [0.0.2] - 2026-02-21
### Added
- Added `.gitignore` to prevent reintroducing build artifacts and temp files.
### Changed
- Consolidated card styling in `css/style.css` to reduce duplication.
### Removed
- Removed unused artifacts: `css/style.css.map`, `index.html.zip`, `tmp/`, `img/table.jpg`, and `img/table.png`.
- Removed the unused `Split` button from the UI.

## [0.0.1] - 2026-02-21
### Added
- Created this changelog to track changes going forward.
- Added `amplify.yml` to make the Amplify build explicit and disable caching.
### Changed
- Refactored `app.js` into a structured, state-driven game flow.
- Normalized asset paths in `index.html` and `css/style.css` for consistent loading.
### Removed
- Removed legacy, unused files: `blackjack.js`, `deckOfCards.js`, `blackjack.css`, and `scss/`.
