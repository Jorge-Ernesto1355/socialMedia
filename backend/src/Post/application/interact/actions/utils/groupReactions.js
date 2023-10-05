function groupReactions(reactions) {
  // Check if reactions is an array and not empty
  if (!Array.isArray(reactions) || reactions.length === 0) {
    return [];
  }

  const groupedReactions = reactions.reduce((grouped, reaction) => {
    const label = reaction.label;
    if (grouped[label]) {
      grouped[label].push(reaction);
    } else {
      grouped[label] = [reaction];
    }
    return grouped;
  }, {});

  return groupedReactions;
}

module.exports = groupReactions;
