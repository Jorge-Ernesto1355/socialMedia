const Votess = require("../../../dominio/Votess");

const getVote = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(500).json({ message: "algo salio mal" });

  try {
    const vote = await Votess.findById(id);

    return res.status(200).json(vote);
  } catch (error) {
    return res.status(500).json({ message: "algo salio mal" });
  }
};

module.exports = getVote;
