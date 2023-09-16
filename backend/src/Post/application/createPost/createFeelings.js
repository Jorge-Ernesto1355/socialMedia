const Feeling = require('../../dominio/Feeling')
const createFeelings = async () => {
  try {
    // Count Documents
   
      const count = await Feeling.estimatedDocumentCount();
    // Create default Roles
    if (count > 0) return;

    const values = await Promise.all([
      new Feeling({ feeling: "Feliz" }).save(),
      new Feeling({ feeling: "Triste" }).save(),
      new Feeling({ feeling: "Enamorado" }).save(),
      new Feeling({ feeling: "Abrumado" }).save(),
      new Feeling({ feeling: "Enojado" }).save(),
      
    ]);
   
   

 
  } catch (error) {
   
  }
};

module.exports = createFeelings