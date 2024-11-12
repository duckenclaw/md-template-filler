require('dotenv').config();
const { loadGames } = require('./loadGames');
const { generateMarkdownFromTemplate } = require('./generateMarkdown');
const { generateRelatedFiles } = require('./generateRelatedFiles');
const path = require('path');
const fs = require('fs');

// Paths
const outputDir = path.join(__dirname, 'output');

// Function to process each game
async function processGame(game) {
  const { name, status } = game;
  console.log(`Processing game: ${name} with status: ${status}`);

  // Generate game markdown
  const gameContent = await generateMarkdownFromTemplate('game-template.md', game);
  const gameFilePath = path.join(outputDir, `${name.replace(/\s+/g, '_')}.md`);
  fs.writeFileSync(gameFilePath, gameContent);

  console.log(`Generated markdown for ${name}`);

  // Generate related files
  await generateRelatedFiles(game);
}

// Load games and start processing
loadGames(processGame);