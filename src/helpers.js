// Helper function to get the entity name from the game data
function getEntityName(game, entityType) {
    if (entityType === 'developer') return game.developer || 'N/A';
    if (entityType === 'publisher') return game.publisher || game.developer || 'N/A';
    if (entityType === 'director') return game.director || 'N/A';
    return 'N/A';
  }
  
  module.exports = { getEntityName };