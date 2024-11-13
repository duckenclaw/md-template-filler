const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');

// OpenAI Configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Function to generate markdown from a template
async function generateMarkdownFromTemplate(templateName, game) {
  const templatePath = path.join(__dirname, 'templates', templateName);
  const templateContent = fs.readFileSync(templatePath, 'utf8');

  const prompt = `Fill in the following template based on the game details:\nGame Name: ${game.name}\nStatus: ${game.status}\nTemplate:\n\`\`\`md\nmd${templateContent}\n\`\`\``;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 800
  });

  return response.data.choices[0].message.content.trim();
}

module.exports = { generateMarkdownFromTemplate };