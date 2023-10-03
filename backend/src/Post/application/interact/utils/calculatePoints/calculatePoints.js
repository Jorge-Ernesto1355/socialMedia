const Reaction = require("../../../../dominio/Reaction");

const objeto = {
    "reactions": {
      "gusta": [{ "label": "like", "value": 2 }],
      "encanta": [{ "label": "love", "value": 5 }],
      "asombra": [{ "label": "wow", "value": 3 }],
      "divierte": [{ "label": "haha", "value": 1 }],
      "entristece": [{ "label": "sad", "value": 0 }]
    }
  };
  
  
  async function  calculatePoints(reactions) {

   // Obtener todos los ObjectID y aplanar el array
  const allReactions = Object.values(reactions).flat();

  // Inicializar totalPoints y etiquetas
  let totalPoints = 0;
  const etiquetas = {};

  // Iterar a través de los ObjectID populizadosgh
  allReactions.forEach((reaction) => {
    // Verificar si el reaction es un ObjectID válido
    if (reaction && typeof reaction === 'object' && reaction instanceof ObjectID) {
      const {value, label} = calcularValorParaReaccion(reaction); // función para calcular el valor de la reacción
      // función para obtener la etiqueta de la reacción

      // Verificar si se pudo obtener el valor y la etiqueta de la reacción
      if (typeof value === 'number' && !isNaN(value) && typeof label === 'string') {
        // Sumar los valores de todas las reacciones
        totalPoints += value;

        // Almacenar las etiquetas y sus valores en el objeto etiquetas
        etiquetas[label] = value;
      }
    }
  });

  return { totalPoints, etiquetas };
}
  

  
module.exports = calculatePoints