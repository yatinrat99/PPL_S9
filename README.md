# PPL Season 9 — Cricket Auction

Vite + React. Marathi player names, Devanagari font, Season 1–8 winners and working per-player editable Current Bid.

## Run
npm install
npm run start

Vite will show the local URL, normally http://localhost:5173.

## Edit
- `src/data/players.js`: player names, prices, roles, images, winners.
- `public/player-placeholder.svg`: replace with your default player photo.
- `public/winners/season-1.svg` ... `season-8.svg`: replace with your winner photos.

Every player card has its own CURRENT BID input. Editing it updates the same player in the reveal popup. The `+ ₹500 BID` button also updates that value.
