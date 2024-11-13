const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const dataFilePath = path.join(__dirname, 'data', 'games.csv');

function loadGames(processGameCallback) {
  const games = [];
  fs.createReadStream(dataFilePath)
    .pipe(csv())
    .on('data', (row) => games.push(row))
    .on('end', async () => {
      console.log('CSV file successfully processed');
      for (const game of games) {
        await processGameCallback(game);
      }
    });
}

module.exports = { loadGames };