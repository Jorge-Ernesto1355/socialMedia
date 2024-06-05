
const calculatePoints = require("../interact/utils/calculatePoints/calculatePoints");
const PostService = require("../../PostService");
const findTimeLine = async (req, res) => {

  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;
  const {userId} = req.params

  const timeLinePosts = await PostService.getTimeLine({userId, limit, page})

  if(timeLinePosts?.error){
    return res.status(500).json({error: timeLinePosts?.message})
  }

  return res.status(200).json(timeLinePosts)
};

module.exports = findTimeLine;
