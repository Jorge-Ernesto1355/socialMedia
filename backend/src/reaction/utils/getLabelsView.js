function getLabelsView(reactions) {
  try {
    // Verificar si se proporciona un array como entrada
    if (!Array.isArray(reactions)) {
      throw new Error("El parámetro debe ser un array de objetos.");
    }

    // Verificar si los objetos en el array tienen la propiedad 'label'
    const labels = reactions.map((reaction) => {
      if (!reaction.label) {
        throw new Error("Cada objeto debe tener una propiedad 'label'.");
      }
      return reaction;
    });

    // Obtener etiquetas únicas usando Set y luego convertirlo nuevamente en un array
    const etiquetasUnicas = Array.from(new Set(labels));

    return etiquetasUnicas;
  } catch (error) {
    // Manejar errores y retornar un mensaje descriptivo
    return `Error: ${error.message}`;
  }
}

module.exports = getLabelsView;
