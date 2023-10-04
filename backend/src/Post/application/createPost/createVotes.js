const Votess = require("../../dominio/Votess");

const createVotes = async ({ req, res, votes }) => {
  const votesJson = JSON.parse(votes);

  if (votes.length === 0) {
    return [];
  }
  try {
    const votesReady = await Promise.all(
      votesJson.map((vote) => {
        const votesSeparado = {
          uuid: vote.uuid,
          text: vote.text,
        };

        const newVote = new Votess(votesSeparado);
        newVote.save();
        return newVote;
      })
    );

    return votesReady;
  } catch (error) {
    // return res.status(500).json({ message: "algo salio maldd" });
  }
};

module.exports = createVotes;
