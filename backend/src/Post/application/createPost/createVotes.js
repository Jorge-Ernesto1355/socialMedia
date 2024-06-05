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
    return {
      error,
      message: error.message
    }
  }
};

module.exports = createVotes;
