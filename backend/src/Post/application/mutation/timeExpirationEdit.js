const PostService = require("../../PostService");

const timeExpiratioEdit = async (req, res) => {
  const { postId, userId } = req.params;
  const { timeExpiration } = req.body;

  const editTimeExpiration = await PostService.editTimeExpire({
    postId,
    userId,
    timeExpiration,
  });

  if (editTimeExpiration?.error)
    return res.status(500).json({ error: editTimeExpiration?.message });

  return res.status(203).json({ message: editTimeExpiration?.message });
};

module.exports = timeExpiratioEdit;
