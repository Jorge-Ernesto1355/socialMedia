const { default: mongoose } = require("mongoose");
const isValidObjectId = require("../../libs/isValidObjectId");
const labelsValue = require("./labelsValue");

async function getTotalPoints(reactions) {
  // Verifica si reactions es un array y no está vacío
  if (!Array.isArray(reactions) || reactions.length === 0) {
    return 0
  }

  let puntosTotales = 0;

  // Recorre el array de IDs de reacciones
  for (const reactionId of reactions) {
     

    try {
      // Busca la reacción en la base de datos por su ID
      const queryOptions = {
        model:"Reaction", 
        select:['label']
      }
      const reaction = await isValidObjectId({_id:reactionId}, queryOptions)
    
      if(reaction.error)
        throw new Error(reaction.message)

      puntosTotales += labelsValue[reaction.label] ? labelsValue[reaction.label] : 0

    } catch (error) {
      return {
        error, 
        message:error.message
      }
    }
  }

  return puntosTotales;
}

module.exports = getTotalPoints

