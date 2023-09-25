const User = require("../../../../users/domain/UserModel");
const Post = require("../../../dominio/Post");
const Votess = require("../../../dominio/Votess");

const Votes = async (req, res) => {
  const { userId, postId, voteId, previousVote } = req.query;

  console.log(userId, postId, voteId, previousVote);

  //userId user que vamos agregar a la votacion
  //postId la publicacion a la que le vamos a poner el userId
  //voteId para encontrar el vote en especifico
  // previousVote para quitar el vote anterior y poner el nuevo

  try {
    const post = await Post.findById(postId);

    if (!post.votes.includes(voteId)) {
      return res.status(400).json({ message: "no pertenece a ningun voto" });
    }

    if (userId === null) {
      return res.status(400).json({ message: "proporciona el id" });
    }

    if (post.votes.includes(voteId)) {
      const vote = await Votess.findById(voteId);

      if (previousVote) {
        const previousVoteMongo = await Votess.findById(previousVote);

        if (previousVoteMongo?.counter?.includes(userId)) {
          await previousVoteMongo.updateOne({ $pull: { counter: userId } });
          if (!vote.counter.includes(userId)) {
            await vote.updateOne({ $push: { counter: userId } });
          }

          await previousVoteMongo.save();

          await vote.save();
          return res.status(200).json({ message: "makan" });
        }
      }

      if (!previousVote) {
        if (vote?.counter?.includes(userId)) {
          await vote.updateOne({ $pull: { counter: userId } });

          await vote.save();

          return res.status(500).json({ message: "no puedes votar dos veces" });
        }
      }

      vote.counter = [...vote.counter, userId];

      await vote.save();
      return res.status(201).json({ message: "has votado" });
    }
  } catch (error) {
    return res.status(500).json({ message: "algo salio mal " });
  }
};

module.exports = Votes;
