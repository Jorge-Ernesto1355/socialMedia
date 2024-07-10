const { default: mongoose } = require("mongoose");
const isValidObjectId = require("../../libs/isValidObjectId");
const labelsValue = require("./labelsValue");

async function getTotalPoints(reactions) {
  if (!Array.isArray(reactions) || reactions.length === 0) {
    return 0;
  }

  let puntosTotales = 0;

  const queryOptions = {
    model: "Reaction",
    select: ['label']
  };

  for (const reactionId of reactions) {
    try {
      const reaction = await isValidObjectId({_id: reactionId}, queryOptions);
      if (!reaction.error) {
        puntosTotales += labelsValue[reaction.label] || 0;
      }
      
    } catch (error) {
      return error
    }
  }

  return puntosTotales;
}

module.exports = getTotalPoints

