const getHashtags = (text) => {
    // Usa una expresión regular para encontrar todas las palabras que siguen a un símbolo #
    const hashtags = text.match(/#\w+/g) || [];
    
    // Elimina el símbolo # y transforma la primera letra a mayúscula
    const formattedHashtags = hashtags.map(hashtag => {
      const word = hashtag.slice(1); // Elimina el símbolo #
      return word.charAt(0).toUpperCase() + word.slice(1); // Transforma la primera letra a mayúscula
    });
  
    return formattedHashtags;
  };

module.exports = getHashtags