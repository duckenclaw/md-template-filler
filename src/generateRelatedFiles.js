const { generateMarkdownFromTemplate } = require('./generateMarkdown');
const { getEntityName } = require('./helpers');
const path = require('path');
const fs = require('fs');

// Function to generate related files (studios, publishers, directors)
async function generateRelatedFiles(game) {
  await generateMarkdownForEntity('studio-template.md', game, 'developer');
  await generateMarkdownForEntity('publisher-template.md', game, 'publisher');
  await generateMarkdownForEntity('director-template.md', game, 'director');
}

// Function to generate markdown for an entity type
async function generateMarkdownForEntity(templateName, game, entityType) {
  const entityName = getEntityName(game, entityType);
  if (!entityName) return;

  const entityFilePath = path.join(__dirname, 'output', `${entityName.replace(/\s+/g, '_')}.md`);
  if (fs.existsSync(entityFilePath)) {
    console.log(`${entityType} file already exists for ${entityName}`);
    return; // Avoid overwriting existing files
  }

  const entityContent = await generateMarkdownFromTemplate(templateName, game);
  fs.writeFileSync(entityFilePath, entityContent);
  console.log(`Generated ${entityType} markdown for ${entityName}`);
}

module.exports = { generateRelatedFiles };