/**
 * Convierte un objeto de archivo en una instancia de `File`.
 * @param {Object} fileObj - El objeto de archivo a convertir.
 * @returns {File} - La instancia de `File` creada.
 */
 export function convertToFile(fileObj) {
    if (!fileObj || !fileObj.name || !fileObj.type || !fileObj.size) {
      throw new Error("Invalid file object");
    }
  
    return new File(
      [fileObj],
      fileObj.name,
      {
        type: fileObj.type,
        lastModified: fileObj.lastModified,
      }
    );
  }